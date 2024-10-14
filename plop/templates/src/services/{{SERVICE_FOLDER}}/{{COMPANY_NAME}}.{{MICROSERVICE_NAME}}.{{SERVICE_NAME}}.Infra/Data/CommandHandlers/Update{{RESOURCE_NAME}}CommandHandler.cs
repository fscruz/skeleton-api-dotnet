using System.Data.Common;
using {{COMPANY_NAME}}.DotNet.Core.Application.Abstractions.Commands;
using {{COMPANY_NAME}}.DotNet.Core.Application.Abstractions.DataAccess;
using {{COMPANY_NAME}}.DotNet.Core.Common.Exceptions;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Commands;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Entities.{{RESOURCE_NAME_PLURAL}};
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.Data.Mappers;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.Data.CommandHandlers
{
    public class Update{{RESOURCE_NAME}}CommandHandler(IDatabaseContext context) : ICommandHandler<Update{{RESOURCE_NAME}}Command>
    {
        public async Task Handle(Update{{RESOURCE_NAME}}Command request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            throw new NotImplementedException();
        }
    }
}
