using System.Globalization;
using {{COMPANY_NAME}}.DotNet.Middlewares.ScimV2.Domain.Entities;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Entities.{{RESOURCE_NAME_PLURAL}};

/// <summary>
/// This is an example of a resource's type 
/// TODO replace with your actual type
/// </summary>
public partial class {{RESOURCE_NAME}} : Resource
{
    public static class Converter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters =
            {
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }
}

public static class Serialize
{
    public static string ToJson(this {{RESOURCE_NAME}} self) => JsonConvert.SerializeObject(self, {{RESOURCE_NAME}}.Converter.Settings);
}