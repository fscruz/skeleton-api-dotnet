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
      original: 'students',
      find: /students/g,
      replace: '{{RESOURCE_TYPE_NAME_CCP}}'
  },
  {
    original: 'student',
    find: /student/g,
    replace: '{{RESOURCE_TYPE_NAME_CC}}'
  },
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
  },
  {
    original: 'src',
    find: /src/g,
    replace: '{{PROJECT_PATH}}'
}
]

export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });