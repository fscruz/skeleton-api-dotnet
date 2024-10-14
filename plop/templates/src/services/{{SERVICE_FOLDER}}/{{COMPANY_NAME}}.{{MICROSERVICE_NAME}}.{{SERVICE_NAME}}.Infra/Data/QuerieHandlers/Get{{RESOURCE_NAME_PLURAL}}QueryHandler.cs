using {{COMPANY_NAME}}.DotNet.Core.Application.Abstractions.DataAccess;
using {{COMPANY_NAME}}.DotNet.Core.Application.Abstractions.Queries;
using {{COMPANY_NAME}}.DotNet.Core.Common.Utils;
using {{COMPANY_NAME}}.DotNet.Core.Domain;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Entities.{{RESOURCE_NAME_PLURAL}};
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Queries;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.Data.QuerieHandlers
{
    public class Get{{RESOURCE_NAME_PLURAL}}QueryHandler(IDatabaseContext context)
        : IQueryHandler<Get{{RESOURCE_NAME_PLURAL}}Query, PaginatedCollection>
    {
        public async Task<PaginatedCollection> Handle(Get{{RESOURCE_NAME_PLURAL}}Query request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var page = (int)request.Context.State.Pagination.Page;
            var perPage = (int)request.Context.State.Pagination.PerPage;
            var count = 0;
            
            throw new NotImplementedException();
            
            request.Context.State.Pagination.TotalCount = 0;
            return new PaginatedCollection
            {
                Page = page,
                PerPage = perPage,
                TotalCount = count,
                Records = [],
            };
        }
    }
}
