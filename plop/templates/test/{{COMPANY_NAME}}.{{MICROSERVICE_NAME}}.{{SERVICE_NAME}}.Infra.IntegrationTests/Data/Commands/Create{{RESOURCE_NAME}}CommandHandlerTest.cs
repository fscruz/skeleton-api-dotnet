using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Commands;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Entities.{{RESOURCE_NAME_PLURAL}};
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Queries;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.Data.CommandHandlers;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.Data.QuerieHandlers;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.WebApi.IntegrationTests;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.IntegrationTests.Data.Commands;

[TestClass]
public class Create{{RESOURCE_NAME}}CommandHandlerTest : IntegrationTestsBase
{
    [TestMethod]
    public async Task Handle_ValidRequest_Inserts{{RESOURCE_NAME}}IntoDatabase()
    {
        // Arrange
        var create{{RESOURCE_NAME}}CommandHandler = new Create{{RESOURCE_NAME}}CommandHandler(DatabaseContext);
        var create{{RESOURCE_NAME}}Command = new Create{{RESOURCE_NAME}}Command
        {   
            {{RESOURCE_NAME}} = new {{RESOURCE_NAME}}
            {
                // TODO
            }
        };

        // Act
        await create{{RESOURCE_NAME}}CommandHandler.Handle(create{{RESOURCE_NAME}}Command, CancellationToken.None);

        // Assert
        var get{{RESOURCE_NAME}}ByIdQueryHandler = new Get{{RESOURCE_NAME}}ByIdQueryHandler(DatabaseContext);
        var get{{RESOURCE_NAME}}ByIdQuery = new Get{{RESOURCE_NAME}}ByIdQuery
        {
            UniqueId = create{{RESOURCE_NAME}}Command.{{RESOURCE_NAME}}.UniqueId!.Value
        };
        var resource = await get{{RESOURCE_NAME}}ByIdQueryHandler.Handle(get{{RESOURCE_NAME}}ByIdQuery, CancellationToken.None);
        Assert.IsNotNull(resource);
        
        // TODO
    }
}