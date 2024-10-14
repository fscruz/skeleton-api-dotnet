using {{COMPANY_NAME}}.DotNet.Core.Common.Exceptions;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Commands;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Entities.{{RESOURCE_NAME_PLURAL}};
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Queries;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.Data.CommandHandlers;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.Data.QuerieHandlers;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.WebApi.IntegrationTests;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.IntegrationTests.Data.Queries;

[TestClass]
public class Get{{RESOURCE_NAME}}ByIdQueryHandlerTests : IntegrationTestsBase
{
    [TestMethod]
    public async Task Handle_ValidRequest_Get{{RESOURCE_NAME}}FromDatabase()
    {
        // Arrange
        var get{{RESOURCE_NAME}}ByIdQueryHandler = new Get{{RESOURCE_NAME}}ByIdQueryHandler(DatabaseContext);
        var create{{RESOURCE_NAME}}CommandHandler = new Create{{RESOURCE_NAME}}CommandHandler(DatabaseContext);
        var create{{RESOURCE_NAME}}Command = new Create{{RESOURCE_NAME}}Command
        {   
            {{RESOURCE_NAME}} = new {{RESOURCE_NAME}}
            {
                // TODO
            }
        };
        await create{{RESOURCE_NAME}}CommandHandler.Handle(create{{RESOURCE_NAME}}Command, CancellationToken.None);
        var get{{RESOURCE_NAME}}ByIdQuery = new Get{{RESOURCE_NAME}}ByIdQuery
        {
            UniqueId = create{{RESOURCE_NAME}}Command.{{RESOURCE_NAME}}.UniqueId!.Value
        };
        
        // Act
        var resource = await get{{RESOURCE_NAME}}ByIdQueryHandler.Handle(get{{RESOURCE_NAME}}ByIdQuery, CancellationToken.None);

        // Assert
        Assert.IsNotNull(resource);
        Assert.IsNotNull(resource.Id);
        Assert.IsNotNull(resource.UniqueId);
        
        // TODO
    }
    
    [TestMethod]
    public async Task Handle_{{RESOURCE_NAME}}DoesntExist_EntityNotFoundExceptionIsThrown()
    {
        // Arrange
        var get{{RESOURCE_NAME}}ByIdQueryHandler = new Get{{RESOURCE_NAME}}ByIdQueryHandler(DatabaseContext);
        var id = Guid.NewGuid();
        var get{{RESOURCE_NAME}}ByIdQuery = new Get{{RESOURCE_NAME}}ByIdQuery
        {
            UniqueId = id
        };

        using var connection = DatabaseContext.CreateConnection();
        
        // Act
        var action = () => get{{RESOURCE_NAME}}ByIdQueryHandler.Handle(get{{RESOURCE_NAME}}ByIdQuery, CancellationToken.None);

        // Assert
        var ex = await Assert.ThrowsExceptionAsync<EntityNotFoundException>(() => action());
        Assert.AreEqual($"The {{RESOURCE_NAME}} with id {id} was not found.", ex.Message);
    }
}