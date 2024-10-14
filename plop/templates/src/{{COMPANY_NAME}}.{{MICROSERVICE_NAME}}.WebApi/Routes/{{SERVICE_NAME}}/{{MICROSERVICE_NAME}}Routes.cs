using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Application.Abstractions.Services;
using {{COMPANY_NAME}}.DotNet.Middlewares.ScimV2.ExtensionMethods;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Application.Services;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.WebApi.Routes.{{SERVICE_NAME}}
{
    public static class {{MICROSERVICE_NAME}}Routes
    {
        public static void Use{{MICROSERVICE_NAME}}Routes(this IEndpointRouteBuilder app)
        {
            app.UseScimV2Routes<I{{RESOURCE_NAME}}Service>(
                "{{RESOURCE_LOCATION}}",
                DefaultScimV2RouteOptions.CreateFor<{{RESOURCE_NAME}}Service>());
        }
    }
}