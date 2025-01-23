import { CommandProcessor } from '../../utils/commandProcessor.mjs';
export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });
  
export const file = 'src/Looplex.DotNet.Samples.WebApi/Services/InMemorySecretsService.cs';
export const outputFile = '{{PROJECT_PATH}}/{{PROJECT_NAMESPACE}}.WebApi/Services/InMemorySecretsService.cs';
const replaces = [
  {
    original: 'Looplex.DotNet.Samples.WebApi',
    find: /Looplex.DotNet.Samples.WebApi/g,
    replace: '{{PROJECT_NAMESPACE}}.WebApi'
  },
  {
    original: 'looplex.dotnet.samples.academic.db',
    find: /looplex.dotnet.samples.academic.db/g,
    replace: '{{SERVICE_DB_HOST}}'
  },
  {
    original: '1433',
    find: /1433/g,
    replace: '{{SERVICE_DB_PORT}}'
  },
  {
    original: 'dotnetsamples',
    find: /dotnetsamples/g,
    replace: '{{SERVICE_DB_NAME}}'
  },
  {
    original: 'samplesUser',
    find: /samplesUser/g,
    replace: '{{SERVICE_DB_USER}}'
  },
  {
    original: '!ooplex_D0tNet!',
    find: /!ooplex_D0tNet!/g,
    replace: '{{SERVICE_DB_PASSWORD}}'
  }
]