import { CommandProcessor } from '../../utils/commandProcessor.mjs';

export const file = 'test/Looplex.DotNet.Samples.IntegrationTests/IntegrationTestsBase.cs';
export const outputFile = '{{TESTPROJECT_PATH}}/{{PROJECT_NAMESPACE}}.IntegrationTests/IntegrationTestsBase.cs';
const replaces = [
  {
    original: 'Looplex.DotNet.Samples',
    find: /Looplex.DotNet.Samples/g,
    replace: '{{PROJECT_NAMESPACE}}'
  },
  {
    original: '!ooplex_D0tNet!',
    find: /!ooplex_D0tNet!/g,
    replace: '{{SERVICE_DB_PASSWORD}}'
  },
  {
    original: 'samplesUser',
    find: /samplesUser/g,
    replace: '{{SERVICE_DB_USER}}'
  },
  {
    original: 'dotnetsamples',
    find: /dotnetsamples/g,
    replace: '{{SERVICE_DB_NAME}}'
  },
  {
    original: '1433',
    find: /1434/g,
    replace: '{{SERVICE_DB_PORT}}'
  }
]

export default (filePath, outputFilePath) => 
    CommandProcessor.process({
      filePath,
      outputFilePath,
      patterns: replaces
    });
  