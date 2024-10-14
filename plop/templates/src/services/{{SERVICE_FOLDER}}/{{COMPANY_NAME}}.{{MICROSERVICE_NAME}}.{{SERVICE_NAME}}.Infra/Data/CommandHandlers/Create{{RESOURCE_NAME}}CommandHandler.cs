using {{COMPANY_NAME}}.DotNet.Core.Application.Abstractions.Commands;
using {{COMPANY_NAME}}.DotNet.Core.Application.Abstractions.DataAccess;
using {{COMPANY_NAME}}.DotNet.Middlewares.ScimV2.Domain.Entities;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Commands;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.Data.CommandHandlers
{
    public class Create{{RESOURCE_NAME}}CommandHandler(IDatabaseContext context) : ICommandHandler<Create{{RESOURCE_NAME}}Command>
    {
        public async Task Handle(Create{{RESOURCE_NAME}}Command request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            throw new NotImplementedException();
        }
    }
}
