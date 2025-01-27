import { CommandProcessor } from '../../utils/commandProcessor.mjs';

export const file = 'test/Looplex.DotNet.Samples.Academic.Infra.IntegrationTests/Looplex.DotNet.Samples.Academic.Infra.IntegrationTests.csproj';
export const outputFile = '{{TESTPROJECT_PATH}}/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Infra.IntegrationTests/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Infra.IntegrationTests.csproj';
const replaces = [
  {
      original: 'Students',
      find: /Students/g,
      replace: '{{RESOURCE_TYPE_NAME_P}}'
  },
  {
    original: 'Student',
    find: /Student/g,
    replace: '{{RESOURCE_TYPE_NAME}}'
  },
  {
      original: 'Students',
      find: /students/g,
      replace: '{{CC RESOURCE_TYPE_NAMEP}}'
  },
  {
    original: 'Student',
    find: /student/g,
    replace: '{{CC RESOURCE_TYPE_NAME}}'
  },
  {
    original: 'Looplex.DotNet.Samples',
    find: /Looplex.DotNet.Samples/g,
    replace: '\\{{PROJECT_NAMESPACE}}'
  },
  {
    original: 'Academic',
    find: /Academic/g,
    replace: '{{MODULE_NAME}}'
  },
  {
    original: 'Academic',
    find: /academic/g,
    replace: '{{CC MODULE_NAME}}'
  },
  {
    original: 'src',
    find: /src/g,
    replace: '\\{{PROJECT_PATH}}'
},
{
  original: 'services',
  find: /services/g,
  replace: 'services\\'
}
]

export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });