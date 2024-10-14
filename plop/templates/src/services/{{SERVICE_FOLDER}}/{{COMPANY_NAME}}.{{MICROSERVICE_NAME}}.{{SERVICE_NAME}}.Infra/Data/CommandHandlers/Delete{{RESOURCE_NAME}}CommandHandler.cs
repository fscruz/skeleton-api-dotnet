using {{COMPANY_NAME}}.DotNet.Core.Application.Abstractions.Commands;
using {{COMPANY_NAME}}.DotNet.Core.Application.Abstractions.DataAccess;
using {{COMPANY_NAME}}.DotNet.Core.Common.Exceptions;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Commands;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Entities.{{RESOURCE_NAME_PLURAL}};

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.Data.CommandHandlers
{
    public class Delete{{RESOURCE_NAME}}CommandHandler(IDatabaseContext context) : ICommandHandler<Delete{{RESOURCE_NAME}}Command>
    {
        public async Task Handle(Delete{{RESOURCE_NAME}}Command request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            throw new NotImplementedException();
        }
    }
}
