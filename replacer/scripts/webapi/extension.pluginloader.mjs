import { CommandProcessor } from '../../utils/commandProcessor.mjs';
export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });

export const file = 'src/Looplex.DotNet.Samples.WebApi/Extensions/PluginLoader.cs';
export const outputFile = '{{WEB_API_PROJECT_NAME}}/Extensions/PluginLoader.cs';
const replaces = [
  {
    original: 'Looplex.DotNet.Samples.WebApi',
    find: /Looplex.DotNet.Samples.WebApi/g,
    replace: '{{WEB_API_PROJECT_NAME}}'
  }
]