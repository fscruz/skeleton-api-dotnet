using {{COMPANY_NAME}}.DotNet.Core.Application.Abstractions.Factories;
using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.WebApi.Extensions;
using {{COMPANY_NAME}}.OpenForExtension.Abstractions.Contexts;
using {{COMPANY_NAME}}.OpenForExtension.Contexts;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.WebApi.Factories;

public class ContextFactory(IServiceProvider serviceProvider) : IContextFactory
{
    private readonly IServiceProvider _serviceProvider = serviceProvider;
    
    public IContext Create(IEnumerable<string> services)
    {
        var plugins = PluginLoader.Load(/*services*/);
        return DefaultContext.Create(plugins, _serviceProvider);
    }
}