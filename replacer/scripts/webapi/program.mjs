import { CommandProcessor } from '../../utils/commandProcessor.mjs';
export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });

export const file = 'src/Looplex.DotNet.Samples.WebApi/Program.cs';
export const outputFile = '{{PROJECT_PATH}}/{{PROJECT_NAMESPACE}}.WebApi/Program.cs';
const replaces = [
  {
    find: /using Looplex.DotNet.WebApi;\n/g,
    replace: ''
  },
  {
    find: /using Looplex.DotNet.Samples.Academic.Infra.IoC;\n/g,
    replace: ''
  },
  {
    original: 'Looplex.DotNet.Samples.WebApi',
    find: /Looplex.DotNet.Samples.WebApi/g,
    replace: '{{PROJECT_NAMESPACE}}.WebApi'
  },
  {
    original: 'Student',
    find: /Student/g,
    replace: '{{RESOURCE_TYPE_NAME}}'
  }
]