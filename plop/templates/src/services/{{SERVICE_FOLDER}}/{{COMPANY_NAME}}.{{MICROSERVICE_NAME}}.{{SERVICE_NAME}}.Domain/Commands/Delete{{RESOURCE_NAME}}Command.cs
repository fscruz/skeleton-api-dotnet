using System;
using {{COMPANY_NAME}}.DotNet.Core.Domain;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Commands
{
    public class Delete{{RESOURCE_NAME}}Command : ICommand
    {
        public required Guid UniqueId { get; init; }
    }
}
