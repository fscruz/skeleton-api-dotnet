using System;
using {{COMPANY_NAME}}.DotNet.Core.Domain;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Entities.{{RESOURCE_NAME_PLURAL}};

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Queries
{
    public class Get{{RESOURCE_NAME}}ByIdQuery : IQuery<{{RESOURCE_NAME}}>
    {
        public required Guid UniqueId { get; init; }
    }
}
