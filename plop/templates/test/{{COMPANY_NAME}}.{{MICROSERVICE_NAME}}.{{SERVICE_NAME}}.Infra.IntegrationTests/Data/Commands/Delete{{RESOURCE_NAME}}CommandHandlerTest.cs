using {{COMPANY_NAME}}.DotNet.Core.Common.Exceptions;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Commands;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Entities.{{RESOURCE_NAME_PLURAL}};
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.Data.CommandHandlers;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.WebApi.IntegrationTests;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.IntegrationTests.Data.Commands;

[TestClass]
public class Delete{{RESOURCE_NAME}}CommandHandlerTest : IntegrationTestsBase
{
    [TestMethod]
    public async Task Handle_ValidRequest_Deletes{{RESOURCE_NAME}}FromDatabase()
    {
        // Arrange
        var delete{{RESOURCE_NAME}}CommandHandler = new Delete{{RESOURCE_NAME}}CommandHandler(DatabaseContext);
        var create{{RESOURCE_NAME}}CommandHandler = new Create{{RESOURCE_NAME}}CommandHandler(DatabaseContext);
        var create{{RESOURCE_NAME}}Command = new Create{{RESOURCE_NAME}}Command
        {   
            {{RESOURCE_NAME}} = new {{RESOURCE_NAME}}
            {
                // TODO
            }
        };
        await create{{RESOURCE_NAME}}CommandHandler.Handle(create{{RESOURCE_NAME}}Command, CancellationToken.None);

        var delete{{RESOURCE_NAME}}Command = new Delete{{RESOURCE_NAME}}Command
        {
            UniqueId = create{{RESOURCE_NAME}}Command.{{RESOURCE_NAME}}.UniqueId!.Value
        };
        
        // Act
        await delete{{RESOURCE_NAME}}CommandHandler.Handle(delete{{RESOURCE_NAME}}Command, CancellationToken.None);

        // Assert
        
        // TODO
    }
    
    [TestMethod]
    public async Task Handle_{{RESOURCE_NAME}}DoesntExist_EntityNotFoundExceptionIsThrown()
    {
        // Arrange
        var delete{{RESOURCE_NAME}}CommandHandler = new Delete{{RESOURCE_NAME}}CommandHandler(DatabaseContext);
        var id = Guid.NewGuid();
        var delete{{RESOURCE_NAME}}Command = new Delete{{RESOURCE_NAME}}Command
        {
            UniqueId = id
        };
        
        // Act
        var action = () => delete{{RESOURCE_NAME}}CommandHandler.Handle(delete{{RESOURCE_NAME}}Command, CancellationToken.None);

        // Assert
        var ex = await Assert.ThrowsExceptionAsync<EntityNotFoundException>(() => action());
        Assert.AreEqual($"The {{RESOURCE_NAME}} with id {id} was not found.", ex.Message);
    }
}