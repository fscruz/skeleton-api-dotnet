using System;
using {{COMPANY_NAME}}.DotNet.Core.Domain.Entities;
using {{COMPANY_NAME}}.DotNet.Core.Domain.Traits;
using Newtonsoft.Json;

namespace {{COMPANY_NAME}}.{{MICROSERVICE_NAME}}.{{SERVICE_NAME}}.Domain.Entities.{{RESOURCE_NAME_PLURAL}};

/// <summary>
/// This is an example of a resource's child type 
/// TODO replace with your actual type
/// </summary>
public partial class Child : IEntity, IHasChangedPropertyNotificationTrait
{
    /// <summary>
    ///     Sequencial id for an entity.
    /// </summary>
    [JsonIgnore]
    public virtual int? Id { get; set; }

    /// <summary>
    ///     A unique identifier for an entity.
    /// </summary>
    [JsonProperty("uuid")]
    public virtual Guid? UniqueId { get; set; }

    [JsonIgnore]
    public virtual int? {{RESOURCE_NAME}}Id { get; set; }
    
    [JsonProperty("stringPropertyName")]
    public virtual string? StringPropertyName { get; set; }
}