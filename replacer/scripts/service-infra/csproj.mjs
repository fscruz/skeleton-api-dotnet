import { CommandProcessor } from '../../utils/commandProcessor.mjs';

export const file = 'src/services/academic/Looplex.DotNet.Samples.Academic.Infra/Looplex.DotNet.Samples.Academic.Infra.csproj';
export const outputFile = '{{PROJECT_PATH}}/services/{{CC MODULE_NAME}}/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Infra/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Infra.csproj';
const replaces = [
{
  original: 'Looplex.DotNet.Samples',
  find: /Looplex.DotNet.Samples/g,
  replace: '{{PROJECT_NAMESPACE}}'
},
{
  original: 'Academic',
  find: /Academic/g,
  replace: '{{MODULE_NAME}}'
}
]
export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });
