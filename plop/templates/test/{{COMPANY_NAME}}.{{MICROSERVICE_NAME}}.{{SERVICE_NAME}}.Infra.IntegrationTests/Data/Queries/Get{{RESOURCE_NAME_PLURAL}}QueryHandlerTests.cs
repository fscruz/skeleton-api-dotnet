using System.Dynamic;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Commands;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Entities.{{RESOURCE_NAME_PLURAL}};
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Queries;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.Data.CommandHandlers;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.Data.QuerieHandlers;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.WebApi.IntegrationTests;
using {{COMPANY_NAME}}.OpenForExtension.Abstractions.Contexts;
using NSubstitute;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.IntegrationTests.Data.Queries;

[TestClass]
public class Get{{RESOURCE_NAME_PLURAL}}QueryHandlerTests : IntegrationTestsBase
{
    [TestMethod]
    public async Task Handle_ValidRequest_Get{{RESOURCE_NAME_PLURAL}}FromDatabase()
    {
        // Arrange
        var create{{RESOURCE_NAME}}CommandHandler = new Create{{RESOURCE_NAME}}CommandHandler(DatabaseContext);
        var context = Substitute.For<IContext>();
        dynamic state = new ExpandoObject();
        context.State.Returns(state);
        dynamic pagination = new ExpandoObject();
        pagination.Page = 1;
        pagination.PerPage = 2;
        state.Pagination = pagination;
        var get{{RESOURCE_NAME_PLURAL}}QueryHandler = new Get{{RESOURCE_NAME_PLURAL}}QueryHandler(DatabaseContext);
        var get{{RESOURCE_NAME_PLURAL}}Query = new Get{{RESOURCE_NAME_PLURAL}}Query
        {
            Context = context
        };
        var create{{RESOURCE_NAME}}Command = new Create{{RESOURCE_NAME}}Command
        {   
            {{RESOURCE_NAME}} = new {{RESOURCE_NAME}}
            {
                // TODO
            }
        };
        await create{{RESOURCE_NAME}}CommandHandler.Handle(create{{RESOURCE_NAME}}Command, CancellationToken.None);
        create{{RESOURCE_NAME}}Command = new Create{{RESOURCE_NAME}}Command
        {   
            {{RESOURCE_NAME}} = new {{RESOURCE_NAME}}
            {
                // TODO
            }
        };
        await create{{RESOURCE_NAME}}CommandHandler.Handle(create{{RESOURCE_NAME}}Command, CancellationToken.None);
        create{{RESOURCE_NAME}}Command = new Create{{RESOURCE_NAME}}Command
        {   
            {{RESOURCE_NAME}} = new {{RESOURCE_NAME}}
            {
                // TODO
            }
        };
        await create{{RESOURCE_NAME}}CommandHandler.Handle(create{{RESOURCE_NAME}}Command, CancellationToken.None);
        using var connection = DatabaseContext.CreateConnection();
        var count = await connection.QueryFirstOrDefaultAsync<int>("select count(1) from students");

        // Act
        var students = await get{{RESOURCE_NAME_PLURAL}}QueryHandler.Handle(get{{RESOURCE_NAME_PLURAL}}Query, CancellationToken.None);

        // Assert
        Assert.AreEqual(count, students.TotalCount);
        Assert.AreEqual(1, students.Page);
        Assert.AreEqual(2, students.PerPage);
        Assert.IsTrue(students.Records.Count() >= 0);
        Assert.IsTrue(students.Records.Count() <= 2);
        
        // TODO
    }
}