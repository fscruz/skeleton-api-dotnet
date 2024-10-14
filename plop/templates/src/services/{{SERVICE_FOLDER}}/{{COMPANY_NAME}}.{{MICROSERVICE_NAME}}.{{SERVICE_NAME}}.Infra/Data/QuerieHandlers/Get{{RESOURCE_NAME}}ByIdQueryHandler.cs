using {{COMPANY_NAME}}.DotNet.Core.Application.Abstractions.DataAccess;
using {{COMPANY_NAME}}.DotNet.Core.Application.Abstractions.Queries;
using {{COMPANY_NAME}}.DotNet.Core.Common.Exceptions;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Entities.{{RESOURCE_NAME_PLURAL}};
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Queries;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.Data.QuerieHandlers
{
    public class Get{{RESOURCE_NAME}}ByIdQueryHandler(IDatabaseContext context) : IQueryHandler<Get{{RESOURCE_NAME}}ByIdQuery, {{RESOURCE_NAME}}>
    {
        public async Task<{{RESOURCE_NAME}}> Handle(Get{{RESOURCE_NAME}}ByIdQuery request, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            throw new NotImplementedException();
        }
    }
}
