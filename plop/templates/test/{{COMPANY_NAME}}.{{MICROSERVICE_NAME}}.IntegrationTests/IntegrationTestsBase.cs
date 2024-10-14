using {{COMPANY_NAME}}.DotNet.Core.Application.Abstractions.DataAccess;
using {{COMPANY_NAME}}.DotNet.Core.Infra.Data;
using Microsoft.Extensions.Configuration;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.WebApi.IntegrationTests;

public abstract class IntegrationTestsBase
{
    protected readonly IConfiguration Configuration 
        = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                { "DbServer", "{{DB_SERVER}}" },
                { "DbPort", "{{DB_PORT}}" },
                { "DbUser", "{{DB_USER}}" },
                { "Password", "{{DB_PASSWORD}}" },
                { "Database", "{{DB_DATABASE}}" }
            })
            .Build();


    private IDatabaseContext? _databaseContext;
    protected IDatabaseContext DatabaseContext
    {
        get 
        {
            if (_databaseContext ==  null)
            {
                _databaseContext = new DatabaseContext(Configuration);
            }
            return _databaseContext;
        }
    }
}