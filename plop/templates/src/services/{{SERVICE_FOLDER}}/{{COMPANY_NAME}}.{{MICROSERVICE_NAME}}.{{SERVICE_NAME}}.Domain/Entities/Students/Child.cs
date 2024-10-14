using {{COMPANY_NAME}}.DotNet.Core.Domain.Traits;
using Newtonsoft.Json;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Entities.{{RESOURCE_NAME_PLURAL}};

/// <summary>
/// This is an example of a resource's child type 
/// TODO replace with your actual type
/// </summary>
public partial class Child
{
    [JsonIgnore]
    public IChangedPropertyNotificationTrait ChangedPropertyNotification { get; } = new ChangedPropertyNotificationTrait();
}