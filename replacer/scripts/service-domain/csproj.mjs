import { CommandProcessor } from '../../utils/commandProcessor.mjs';

const replaces = [
  {
      find: '<None Update="Entities\\Schemas\\Student.1.0.schema.json">',
      replace: ''
  },
  {
    find: '<CopyToOutputDirectory>Always<\/CopyToOutputDirectory>',
    replace: ''
},
{
  find: '</None>',
  replace: ''
}
]

export const file = 'src/services/academic/Looplex.DotNet.Samples.Academic.Domain/Looplex.DotNet.Samples.Academic.Domain.csproj';
export const outputFile = '{{PROJECT_PATH}}/services/{{MODULE_NAME_CC}}/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Domain/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Domain.csproj';
export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });