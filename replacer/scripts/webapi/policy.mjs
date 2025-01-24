import { CommandProcessor } from '../../utils/commandProcessor.mjs';

export const file = 'src/Looplex.DotNet.Samples.WebAPI/policy.csv';
export const outputFile = '{{PROJECT_PATH}}/{{PROJECT_NAMESPACE}}.WebApi/policy.csv';
const replaces = [
  {
    original: 'UserService',
    find: /UserService/g,
    replace: '{{SERVICE_NAME}}'
  }
]

export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });