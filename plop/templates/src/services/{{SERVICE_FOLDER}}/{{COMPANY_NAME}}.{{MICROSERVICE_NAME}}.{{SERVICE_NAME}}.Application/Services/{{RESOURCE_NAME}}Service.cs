using System;
using System.Linq;
using System.Threading;
using {{COMPANY_NAME}}.DotNet.Core.Domain;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Application.Abstractions.Services;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Commands;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Queries;
using MediatR;
using System.Threading.Tasks;
using {{COMPANY_NAME}}.DotNet.Core.Application.ExtensionMethods;
using {{COMPANY_NAME}}.DotNet.Core.Common.Exceptions;
using {{COMPANY_NAME}}.DotNet.Middlewares.ScimV2.Domain.Entities;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Entities.{{RESOURCE_NAME_PLURAL}};
using {{COMPANY_NAME}}.OpenForExtension.Abstractions.Commands;
using {{COMPANY_NAME}}.OpenForExtension.Abstractions.Contexts;
using {{COMPANY_NAME}}.OpenForExtension.Abstractions.ExtensionMethods;
using ScimPatch;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Application.Services
{
    public class {{RESOURCE_NAME}}Service(IMediator mediator) : I{{RESOURCE_NAME}}Service
    {
        private readonly IMediator _mediator = mediator;
        
        public async Task GetAllAsync(IContext context, CancellationToken cancellationToken)
        {
            await context.Plugins.ExecuteAsync<IHandleInput>(context, cancellationToken);

            await context.Plugins.ExecuteAsync<IValidateInput>(context, cancellationToken);
            
            await context.Plugins.ExecuteAsync<IDefineRoles>(context, cancellationToken);

            await context.Plugins.ExecuteAsync<IBind>(context, cancellationToken);

            await context.Plugins.ExecuteAsync<IBeforeAction>(context, cancellationToken);

            if (!context.SkipDefaultAction)
            {
                var get{{RESOURCE_NAME_PLURAL}}Query = new Get{{RESOURCE_NAME_PLURAL}}Query()
                {
                    Context = context,
                };
                var result = await _mediator.Send(get{{RESOURCE_NAME_PLURAL}}Query, cancellationToken);
                context.Result = result.ToJson({{RESOURCE_NAME}}.Converter.Settings);
            }

            await context.Plugins.ExecuteAsync<IAfterAction>(context, cancellationToken);

            await context.Plugins.ExecuteAsync<IReleaseUnmanagedResources>(context, cancellationToken);
        }

        public async Task GetByIdAsync(IContext context, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            
            var id = Guid.Parse(context.GetRequiredValue<string>("Id"));
            await context.Plugins.ExecuteAsync<IHandleInput>(context, cancellationToken);

            var get{{RESOURCE_NAME}}ByIdQuery = new Get{{RESOURCE_NAME}}ByIdQuery
            {
                UniqueId = id
            };
            var resource = await _mediator.Send(get{{RESOURCE_NAME}}ByIdQuery, cancellationToken);
            if (resource == null)
            {
                throw new EntityNotFoundException(nameof({{RESOURCE_NAME}}), id.ToString());
            }
            await context.Plugins.ExecuteAsync<IValidateInput>(context, cancellationToken);

            context.Roles["{{RESOURCE_NAME}}"] = resource;
            await context.Plugins.ExecuteAsync<IDefineRoles>(context, cancellationToken);

            await context.Plugins.ExecuteAsync<IBind>(context, cancellationToken);

            await context.Plugins.ExecuteAsync<IBeforeAction>(context, cancellationToken);

            if (!context.SkipDefaultAction)
            {
                context.Result = (({{RESOURCE_NAME}})context.Roles["{{RESOURCE_NAME}}"]).ToJson();
            }

            await context.Plugins.ExecuteAsync<IAfterAction>(context, cancellationToken);

            await context.Plugins.ExecuteAsync<IReleaseUnmanagedResources>(context, cancellationToken);
        }

        public async Task CreateAsync(IContext context, CancellationToken cancellationToken)
        {
            var json = context.GetRequiredValue<string>("Resource");
            var resource = Resource.FromJson<{{RESOURCE_NAME}}>(json, out var messages);
            await context.Plugins.ExecuteAsync<IHandleInput>(context, cancellationToken);

            if (messages.Count > 0)
            {
                throw new EntityInvalidException(messages.ToList());
            }
            await context.Plugins.ExecuteAsync<IValidateInput>(context, cancellationToken);
            
            context.Roles["{{RESOURCE_NAME}}"] = resource;
            await context.Plugins.ExecuteAsync<IDefineRoles>(context, cancellationToken);

            await context.Plugins.ExecuteAsync<IBind>(context, cancellationToken);

            await context.Plugins.ExecuteAsync<IBeforeAction>(context, cancellationToken);

            if (!context.SkipDefaultAction)
            {
                var create{{RESOURCE_NAME}}Command = new Create{{RESOURCE_NAME}}Command
                {
                    {{RESOURCE_NAME}} = context.Roles["{{RESOURCE_NAME}}"]
                };
                await _mediator.Send(create{{RESOURCE_NAME}}Command, cancellationToken);
                context.Result = context.Roles["{{RESOURCE_NAME}}"].Id;
            }

            await context.Plugins.ExecuteAsync<IAfterAction>(context, cancellationToken);

            await context.Plugins.ExecuteAsync<IReleaseUnmanagedResources>(context, cancellationToken);
        }

        public async Task PatchAsync(IContext context, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var json = context.GetRequiredValue<string>("Operations");
            await GetByIdAsync(context, cancellationToken);
            var resource = (({{RESOURCE_NAME}})context.Roles["{{RESOURCE_NAME}}"])
                .WithObservableProxy();
            context.Roles["{{RESOURCE_NAME}}"] = resource;
            var operations = OperationTracker.FromJson(resource, json);
            await context.Plugins.ExecuteAsync<IHandleInput>(context, cancellationToken);

            if (operations.Count == 0)
            {
                throw new InvalidOperationException("List of operations can't be empty.");
            }
            await context.Plugins.ExecuteAsync<IValidateInput>(context, cancellationToken);

            context.Roles["Operations"] = operations;
            await context.Plugins.ExecuteAsync<IDefineRoles>(context, cancellationToken);

            await context.Plugins.ExecuteAsync<IBind>(context, cancellationToken);

            await context.Plugins.ExecuteAsync<IBeforeAction>(context, cancellationToken);

            if (!context.SkipDefaultAction)
            {
                foreach (var operationNode in context.Roles["Operations"])
                {
                    if (!await operationNode.TryApplyAsync())
                    {
                        throw operationNode.OperationException;
                    }
                }
                json = resource.ToJson();
                _ = Resource.FromJson<{{RESOURCE_NAME}}>(json, out var messages);
                if (messages.Count > 0)
                {
                    throw new EntityInvalidException(messages.ToList());
                }
                var command = new Update{{RESOURCE_NAME}}Command
                {
                    {{RESOURCE_NAME}} = resource
                };
                await _mediator.Send(command, cancellationToken);
            }

            await context.Plugins.ExecuteAsync<IAfterAction>(context, cancellationToken);

            await context.Plugins.ExecuteAsync<IReleaseUnmanagedResources>(context, cancellationToken);
        }

        public async Task DeleteAsync(IContext context, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            
            var id = Guid.Parse(context.GetRequiredValue<string>("Id"));
            await context.Plugins.ExecuteAsync<IHandleInput>(context, cancellationToken);

            await GetByIdAsync(context, cancellationToken);
            var resource = ({{RESOURCE_NAME}})context.Roles["{{RESOURCE_NAME}}"];
            if (resource == null)
            {
                throw new EntityNotFoundException(nameof({{RESOURCE_NAME}}), id.ToString());
            }
            await context.Plugins.ExecuteAsync<IValidateInput>(context, cancellationToken);

            await context.Plugins.ExecuteAsync<IDefineRoles>(context, cancellationToken);

            await context.Plugins.ExecuteAsync<IBind>(context, cancellationToken);

            await context.Plugins.ExecuteAsync<IBeforeAction>(context, cancellationToken);

            if (!context.SkipDefaultAction)
            {
                var command = new Delete{{RESOURCE_NAME}}Command
                {
                    UniqueId = id
                };
                await _mediator.Send(command, cancellationToken);
            }

            await context.Plugins.ExecuteAsync<IAfterAction>(context, cancellationToken);

            await context.Plugins.ExecuteAsync<IReleaseUnmanagedResources>(context, cancellationToken);
        }
    }
}
