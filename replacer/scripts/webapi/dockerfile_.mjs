import { CommandProcessor } from '../../utils/commandProcessor.mjs';
export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });

export const file = 'src/Looplex.DotNet.Samples.WebApi/Dockerfile';
export const outputFile = '{{PROJECT_PATH}}/{{PROJECT_NAMESPACE}}.WebApi/Dockerfile';
const replaces = [
  {
    original: 'src',
    find: /src/g,
    replace: '{{PROJECT_PATH}}'
  },
  {
    original: 'Looplex.DotNet.Samples.WebApi',
    find: /Looplex.DotNet.Samples.WebApi/g,
    replace: '{{PROJECT_NAMESPACE}}.WebApi'
  }
]
