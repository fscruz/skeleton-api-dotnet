using System.Collections.ObjectModel;
using System.Dynamic;
using FluentAssertions;
using {{COMPANY_NAME}}.DotNet.Core.Common.Exceptions;
using {{COMPANY_NAME}}.DotNet.Core.Domain;
using {{COMPANY_NAME}}.DotNet.Middlewares.ScimV2.Domain.Entities.Schemas;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Application.Abstractions.Services;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Application.Services;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Commands;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Entities.{{RESOURCE_NAME_PLURAL}};
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Queries;
using {{COMPANY_NAME}}.OpenForExtension.Abstractions.Contexts;
using MediatR;
using Newtonsoft.Json;
using NSubstitute;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Application.UnitTests.Services;

[TestClass]
public class {{RESOURCE_NAME}}ServiceTests
{
    private IMediator _mediator = null!;
    private I{{RESOURCE_NAME}}Service _resourceService = null!;
    private IContext _context = null!;
    private CancellationToken _cancellationToken;

    [TestInitialize]
    public void Setup()
    {
        _mediator = Substitute.For<IMediator>();
        _resourceService = new {{RESOURCE_NAME}}Service(_mediator);
        _context = Substitute.For<IContext>();
        var state = new ExpandoObject();
        _context.State.Returns(state);
        var roles = new Dictionary<string, dynamic>();
        _context.Roles.Returns(roles);
        _cancellationToken = new CancellationToken();
        if (!Schema.Schemas.ContainsKey(typeof({{RESOURCE_NAME}})))
            Schema.Add<{{RESOURCE_NAME}}>(File.ReadAllText("Entities/Schemas/{{RESOURCE_NAME}}.1.0.schema.json"));
    }
    
    [TestMethod]
    public async Task GetAllAsync_ShouldReturnPaginatedCollection()
    {
        // Arrange
        _context.State.Pagination = new ExpandoObject();
        _context.State.Pagination.Page = 1;
        _context.State.Pagination.PerPage = 10;
        var existing{{RESOURCE_NAME}} = new {{RESOURCE_NAME}}
        {
            Id = null,
            UniqueId = Guid.NewGuid()
        };
        _mediator.Send(Arg.Any<Get{{RESOURCE_NAME_PLURAL}}Query>(), Arg.Any<CancellationToken>())
            .Returns(new PaginatedCollection()
            {
                Page = 1,
                PerPage = 10,
                Records = [existing{{RESOURCE_NAME}}],
                TotalCount = 1,
            });
            
        // Act
        await _resourceService.GetAllAsync(_context, _cancellationToken);

        // Assert
        var result = JsonConvert.DeserializeObject<PaginatedCollection>((string)_context.Result!)!;
        Assert.AreEqual(1, result.TotalCount);
        JsonConvert.DeserializeObject<{{RESOURCE_NAME}}>(result.Records[0].ToString()!).Should().BeEquivalentTo(existing{{RESOURCE_NAME}});
    }

    [TestMethod]
    public async Task GetByIdAsync_ShouldThrowEntityNotFoundException_When{{RESOURCE_NAME}}DoesNotExist()
    {
        // Arrange
        _context.State.Id = Guid.NewGuid().ToString();

        // Act & Assert
        await Assert.ThrowsExceptionAsync<EntityNotFoundException>(() => _resourceService.GetByIdAsync(_context, _cancellationToken));
    }

    [TestMethod]
    public async Task GetByIdAsync_ShouldReturn{{RESOURCE_NAME}}_When{{RESOURCE_NAME}}DoesExist()
    {
        // Arrange
        var existing{{RESOURCE_NAME}} = new {{RESOURCE_NAME}}
        {
            Id = null,
            UniqueId = Guid.NewGuid()
        };
        _context.State.Id = existing{{RESOURCE_NAME}}.UniqueId.ToString()!;
        _mediator.Send(Arg.Is<Get{{RESOURCE_NAME}}ByIdQuery>(q => q.UniqueId == existing{{RESOURCE_NAME}}.UniqueId), Arg.Any<CancellationToken>())
            .Returns(existing{{RESOURCE_NAME}});

        // Act
        await _resourceService.GetByIdAsync(_context, _cancellationToken);
            
        // Assert
        JsonConvert.DeserializeObject<{{RESOURCE_NAME}}>(_context.Result!.ToString()!).Should().BeEquivalentTo(existing{{RESOURCE_NAME}});
    }
    
    [TestMethod]
    public async Task CreateAsync_ShouldAdd{{RESOURCE_NAME}}ToList()
    {
        // Arrange
        var resourceJson = $"\{{ ... }}"; // TODO
        _context.State.Resource = resourceJson;
        
        // Act
        await _resourceService.CreateAsync(_context, _cancellationToken);

        // Assert
        await _mediator.Received(1)
            .Send(Arg.Is<Create{{RESOURCE_NAME}}Command>(c => AssertThatCreate{{RESOURCE_NAME}}IsValid(c.{{RESOURCE_NAME}})), Arg.Any<CancellationToken>());
    }

    private bool AssertThatCreate{{RESOURCE_NAME}}IsValid({{RESOURCE_NAME}} resource)
    {
        // TODO
        return true;
    }

    [TestMethod]
    public async Task PatchAsync_ShouldThrowException_OperationFailed()
    {
        // Arrange
        var existingResource = new {{RESOURCE_NAME}}()
        {
            Id = 1,
            UniqueId = Guid.NewGuid(),
            // TODO
        };
        _mediator.Send(Arg.Any<Get{{RESOURCE_NAME}}ByIdQuery>(), Arg.Any<CancellationToken>())
            .Returns(existingResource);
        _context.State.Operations = "[ { \"op\": \"add\", \"path\": \"InvalidPath\", \"value\": \"Updated Val\" } ]"; // TODO
        _context.State.Id = existingResource.UniqueId.ToString()!;
        _context.Roles["{{RESOURCE_NAME}}"] = existingResource;
        // Act
        var action = () => _resourceService.PatchAsync(_context, _cancellationToken);

        // Assert
        var ex = await Assert.ThrowsExceptionAsync<ArgumentException>(() => action());
        Assert.AreEqual("InvalidPath", ex.ParamName);
    }
    
    [TestMethod]
    public async Task PatchAsync_ShouldApplyOperationsTo{{RESOURCE_NAME}}()
    {
        // Arrange
        var existingResource = new {{RESOURCE_NAME}}()
        {
            Id = 1,
            UniqueId = Guid.NewGuid(),
            // TODO
        };
        _mediator.Send(Arg.Any<Get{{RESOURCE_NAME}}ByIdQuery>(), Arg.Any<CancellationToken>())
            .Returns(existingResource);
        _context.State.Operations = @"[ 
            ...
        ]"; // TODO
        _context.State.Id = existingResource.UniqueId.ToString()!;

        // Act
        await _resourceService.PatchAsync(_context, _cancellationToken);

        // Assert
        await _mediator.Received(1).Send(
            Arg.Is<Update{{RESOURCE_NAME}}Command>(c => AssertThatPatch{{RESOURCE_NAME}}IsValid(c.{{RESOURCE_NAME}})),
            Arg.Any<CancellationToken>());
    }

    private bool AssertThatPatch{{RESOURCE_NAME}}IsValid({{RESOURCE_NAME}} resource)
    {
        // TODO
        return true;
    }
    
    [TestMethod]
    public async Task PatchAsync_EntityIsInvalidAfterPatch_ThrowsEntityInvalidException()
    {
        // Arrange
        var existingResource = new {{RESOURCE_NAME}}()
        {
            Id = 1,
            UniqueId = Guid.NewGuid(),
            // TODO
        };
        _mediator.Send(Arg.Any<Get{{RESOURCE_NAME}}ByIdQuery>(), Arg.Any<CancellationToken>())
            .Returns(existingResource);
        _context.State.Operations = @"[ 
            ...
        ]"; // TODO
        _context.State.Id = existingResource.UniqueId.ToString()!;

        // Act
        var action = () => _resourceService.PatchAsync(_context, _cancellationToken);

        // Assert
        var ex = await Assert.ThrowsExceptionAsync<EntityInvalidException>(async () => await action());
        Assert.AreEqual($"One or more validation errors occurred.", ex.Message);
        
        // TODO

        await _mediator.DidNotReceive().Send(
            Arg.Any<Update{{RESOURCE_NAME}}Command>(),
            Arg.Any<CancellationToken>());
    }

    [TestMethod]
    public async Task DeleteAsync_ShouldThrowEntityNotFoundException_When{{RESOURCE_NAME}}DoesNotExist()
    {
        // Arrange
        _context.State.Id = Guid.NewGuid().ToString();

        // Act & Assert
        await Assert.ThrowsExceptionAsync<EntityNotFoundException>(() => _resourceService.DeleteAsync(_context, _cancellationToken));
    }
    
    [TestMethod]
    public async Task DeleteAsync_ShouldRemove{{RESOURCE_NAME}}FromList_When{{RESOURCE_NAME}}DoesExist()
    {
        // Arrange
        var existing{{RESOURCE_NAME}} = new {{RESOURCE_NAME}}
        {
            Id = 1,
            UniqueId = Guid.NewGuid()
        };
        _context.State.Id = existing{{RESOURCE_NAME}}.UniqueId.ToString()!;
        _mediator.Send(Arg.Is<Get{{RESOURCE_NAME}}ByIdQuery>(q => q.UniqueId == existing{{RESOURCE_NAME}}.UniqueId), Arg.Any<CancellationToken>())
            .Returns(existing{{RESOURCE_NAME}});

        // Act
        await _resourceService.DeleteAsync(_context, _cancellationToken);

        // Assert
        await _mediator.Received(1)
            .Send(Arg.Is<Delete{{RESOURCE_NAME}}Command>(c => c.UniqueId == existing{{RESOURCE_NAME}}.UniqueId), Arg.Any<CancellationToken>());
    }
}