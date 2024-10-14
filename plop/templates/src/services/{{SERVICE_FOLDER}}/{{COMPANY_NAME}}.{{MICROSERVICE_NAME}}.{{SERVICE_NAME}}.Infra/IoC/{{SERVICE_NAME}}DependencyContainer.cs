using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Application.Abstractions.Services;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.IoC
{
    public static class {{SERVICE_NAME}}DependencyContainer
    {
        public static void Add{{SERVICE_NAME}}Services(this IServiceCollection services)
        {
            services.AddScoped<I{{RESOURCE_NAME}}Service, {{RESOURCE_NAME}}Service>();

            RegisterMediatR(services);
        }

        private static void RegisterMediatR(IServiceCollection services)
        {
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof({{SERVICE_NAME}}DependencyContainer).Assembly));
        }
    }
}