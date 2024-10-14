using {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Entities.{{RESOURCE_NAME_PLURAL}};

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Infra.Data.Mappers;

internal static class {{RESOURCE_NAME}}Mapper
{
    private static IDictionary<string, string>? _maps;

    public static IDictionary<string, string> Maps
    {
        get
        {
            if (_maps == null)
                CreateMap();
            
            return _maps!;
        }
    }

    private static void CreateMap()
    {
        _maps = new Dictionary<string, string>();
        _maps.Add(nameof({{RESOURCE_NAME}}.Id), "id");
        _maps.Add(nameof({{RESOURCE_NAME}}.UniqueId), "uid");
        _maps.Add(nameof({{RESOURCE_NAME}}.StringPropertyName), "string_property_name");
        _maps.Add(nameof({{RESOURCE_NAME}}.IntPropertyName), "int_property_name");
    }
}