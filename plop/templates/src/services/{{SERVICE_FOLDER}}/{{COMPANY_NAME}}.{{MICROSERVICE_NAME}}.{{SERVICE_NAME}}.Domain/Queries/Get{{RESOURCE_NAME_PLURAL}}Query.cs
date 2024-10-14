using {{COMPANY_NAME}}.DotNet.Core.Domain;
using {{COMPANY_NAME}}.OpenForExtension.Abstractions.Contexts;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Queries
{
    public class Get{{RESOURCE_NAME_PLURAL}}Query : IQuery<PaginatedCollection>
    {
        public required IContext Context { get; init; }
    }
}
