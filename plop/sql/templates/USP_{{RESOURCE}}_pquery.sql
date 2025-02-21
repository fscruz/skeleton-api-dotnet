IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[USP_{{RESOURCE}}_pquery]') AND type in (N'P', N'PC'))
BEGIN
  DROP PROCEDURE [dbo].[USP_{{RESOURCE}}_pquery]
END
GO

CREATE PROC [dbo].[USP_{{RESOURCE}}_pquery]
  @do_count bit = 0,
  @page int = 1,
  @page_size int = 12,
  @filter_active bit = 1,
  {{#each PARAMS}}
  @filter_{{this.name}} {{this.type}} = NULL,
  {{/each}}
  @order_by varchar(MAX) = NULL
AS
-- validate
IF @page_size > 120
  THROW 65600, N'An invalid optional parameter `@page_size` was specified for procedure `USP_{{RESOURCE}}_query`. Upper boundary is 120.', 1
-- declare
DECLARE @sql nvarchar(MAX);

DECLARE @predicate varchar(MAX) = N'active = @filter_active';
{{#each PARAMS}}
IF @filter_{{this.name}} IS NOT NULL SET @predicate = @predicate + N' AND {{this.name}} LIKE @filter_{{this.name}}';
{{/each}}

DECLARE @safe_orderBy varchar(MAX) = dbo.fn_validateSortSpecificationList(@order_by, '[dbo].[{{RESOURCE}}]', '{{DEFAULT_ORDER_COLUMN}}');
-- act
SET @sql = FORMATMESSAGE(N'
SELECT *
FROM [dbo].[{{RESOURCE}}]
WHERE %s
ORDER BY %s
OFFSET (@page - 1) * @page_size ROWS
FETCH NEXT @page_size ROWS ONLY;
', @predicate, @safe_orderBy)

EXEC sp_executesql @sql,
  N'@page int,
    @page_size int,
    @filter_active bit,
    @filter_firstname varchar(32),
    {{#each PARAMS}}
    @filter_{{this.name}} {{this.type}}{{#unless @last}},{{/unless}}
    {{/each}}
  ',
@page = @page,
@page_size = @page_size,
@filter_active = @filter_active,
{{#each PARAMS}}
@filter_{{this.name}} = @filter_{{this.name}}{{#unless @last}},{{/unless}}
{{/each}};

IF @do_count = 1 BEGIN
  SET @sql = FORMATMESSAGE(N'SELECT total = COUNT(1) FROM [dbo].[{{RESOURCE}}] WHERE %s', @predicate)
  EXEC sp_executesql @sql,
    N'@filter_active bit,
      {{#each PARAMS}}
      @filter_{{this.name}} {{this.type}}{{#unless @last}},{{/unless}}
      {{/each}}
    ',
  @filter_active = @filter_active,
  {{#each PARAMS}}
  @filter_{{this.name}} = @filter_{{this.name}}{{#unless @last}},{{/unless}}
  {{/each}};
END