using System.Collections.Generic;
using System.Collections.ObjectModel;
using Newtonsoft.Json;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Entities.{{RESOURCE_NAME_PLURAL}};

/// <summary>
/// This is an example of a resource's type 
/// TODO replace with your actual type
/// </summary>
public partial class {{RESOURCE_NAME}}
{
    [JsonProperty("stringPropertyName")]
    public virtual string? StringPropertyName { get; set; }

    [JsonProperty("intPropertyName")]
    public virtual int? IntPropertyName { get; set; }

    [JsonProperty("childs")]
    public virtual IList<Child> Childs { get; set; } = new ObservableCollection<Child>();
}