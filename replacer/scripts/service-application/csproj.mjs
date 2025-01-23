import { CommandProcessor } from '../../utils/commandProcessor.mjs';
export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });

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
  },
  {
    original: 'academic',
    find: /academic/g,
    replace: '{{MODULE_NAME_CC}}'
  }
]

export const file = 'src/services/academic/Looplex.DotNet.Samples.Academic.Application/Looplex.DotNet.Samples.Academic.Application.csproj';
export const outputFile = '{{PROJECT_PATH}}/services/{{MODULE_NAME_CC}}/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Application/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Application.csproj';