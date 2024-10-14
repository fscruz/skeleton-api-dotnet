using {{COMPANY_NAME}}.DotNet.Core.Application.Abstractions.Services;
using {{COMPANY_NAME}}.DotNet.Core.WebAPI.Routes;
using {{COMPANY_NAME}}.DotNet.Middlewares.ScimV2.ExtensionMethods;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.WebApi.Routes;

public class DefaultScimV2RouteOptions
{
    public static ScimV2RouteOptions CreateFor<TService>() where TService : class, ICrudService
    {
        var service = nameof(TService);
        return new ScimV2RouteOptions
        {
            
            OptionsForGet = new RouteBuilderOptions
            {
                Services = [$"{service}.{nameof(ICrudService.GetAllAsync)}"],
                Middlewares = [],
            },
            OptionsForGetById = new RouteBuilderOptions
            {
                Services = [$"{service}.{nameof(ICrudService.GetByIdAsync)}"],
                Middlewares = [],
            },
            OptionsForPost = new RouteBuilderOptions
            {
                Services = [$"{service}.{nameof(ICrudService.CreateAsync)}"],
                Middlewares = [],
            },
            OptionsForDelete = new RouteBuilderOptions
            {
                Services = [$"{service}.{nameof(ICrudService.DeleteAsync)}"],
                Middlewares = [],
            },
        };
    }
}