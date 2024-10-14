using {{COMPANY_NAME}}.DotNet.Core.Application.ExtensionMethods;
using {{COMPANY_NAME}}.DotNet.Core.Common.Exceptions;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Commands;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Entities.{{RESOURCE_NAME_PLURAL}};
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Queries;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.Data.CommandHandlers;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.Data.QuerieHandlers;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.WebApi.IntegrationTests;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.IntegrationTests.Data.Commands;

[TestClass]
public class Update{{RESOURCE_NAME}}CommandHandlerTest : IntegrationTestsBase
{
    [TestMethod]
    public async Task Handle_ValidRequest_Updates{{RESOURCE_NAME}}FromDatabase()
    {
        // Arrange
        var update{{RESOURCE_NAME}}CommandHandler = new Update{{RESOURCE_NAME}}CommandHandler(DatabaseContext);
        var create{{RESOURCE_NAME}}CommandHandler = new Create{{RESOURCE_NAME}}CommandHandler(DatabaseContext);
        var create{{RESOURCE_NAME}}Command = new Create{{RESOURCE_NAME}}Command
        {   
            {{RESOURCE_NAME}} = new {{RESOURCE_NAME}}
            {
                // TODO
            }
        };
        
        await create{{RESOURCE_NAME}}CommandHandler.Handle(create{{RESOURCE_NAME}}Command, CancellationToken.None);
        var update{{RESOURCE_NAME}}Command = new Update{{RESOURCE_NAME}}Command
        {
            {{RESOURCE_NAME}} = create{{RESOURCE_NAME}}Command.{{RESOURCE_NAME}}.WithObservableProxy()
        };
        // TODO modify some fiels in the resource

        // Act
        await update{{RESOURCE_NAME}}CommandHandler.Handle(update{{RESOURCE_NAME}}Command, CancellationToken.None);

        // Assert
        var get{{RESOURCE_NAME}}ByIdQueryHandler = new Get{{RESOURCE_NAME}}ByIdQueryHandler(DatabaseContext);
        var get{{RESOURCE_NAME}}ByIdQuery = new Get{{RESOURCE_NAME}}ByIdQuery
        {
            UniqueId = create{{RESOURCE_NAME}}Command.{{RESOURCE_NAME}}.UniqueId!.Value
        };
        var resource = await get{{RESOURCE_NAME}}ByIdQueryHandler.Handle(get{{RESOURCE_NAME}}ByIdQuery, CancellationToken.None);

        // TODO check modified fields
    }
    
    [TestMethod]
    public async Task Handle_{{RESOURCE_NAME}}DoesntExist_EntityNotFoundExceptionIsThrown()
    {
        // Arrange
        var update{{RESOURCE_NAME}}CommandHandler = new Update{{RESOURCE_NAME}}CommandHandler(DatabaseContext);
        var update{{RESOURCE_NAME}}Command = new Update{{RESOURCE_NAME}}Command
        {
            {{RESOURCE_NAME}} = new {{RESOURCE_NAME}}
            {
                UniqueId = Guid.NewGuid()
            }
        };
        // TODO modify some fiels in the resource

        // Act
        var action = () => update{{RESOURCE_NAME}}CommandHandler.Handle(update{{RESOURCE_NAME}}Command, CancellationToken.None);

        // Assert
        var ex = await Assert.ThrowsExceptionAsync<EntityNotFoundException>(() => action());
        Assert.AreEqual($"The {{RESOURCE_NAME}} with id {update{{RESOURCE_NAME}}Command.{{RESOURCE_NAME}}.UniqueId} was not found.", ex.Message);
    }
}