import { CommandProcessor } from '../../utils/commandProcessor.mjs';
export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });

export const file = 'src/Looplex.DotNet.Samples.WebAPI/policy.csv';
export const outputFile = '{{WEB_API_PROJECT_NAME}}/policy.csv';
const replaces = [
  {
    original: 'UserService',
    find: /UserService/g,
    replace: '{{SERVICE_NAME}}'
  }
]