using {{COMPANY_NAME}}.DotNet.Core.Domain;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Entities.{{RESOURCE_NAME_PLURAL}};

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Commands
{
    public class Create{{RESOURCE_NAME}}Command : ICommand
    {
        public required {{RESOURCE_NAME}} {{RESOURCE_NAME}} { get; init; }
    }
}
