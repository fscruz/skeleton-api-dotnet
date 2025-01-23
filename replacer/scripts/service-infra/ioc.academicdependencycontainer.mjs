import { CommandProcessor } from '../../utils/commandProcessor.mjs';

export const file = 'src/services/academic/Looplex.DotNet.Samples.Academic.Infra/Ioc/AcademicDependencyContainer.cs';
export const outputFile = '{{PROJECT_PATH}}/services/{{MODULE_NAME_CC}}/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Infra/Ioc/{{MODULE_NAME_CC}}DependencyContainer.cs';
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
  }
  ,
  {
    original: 'academic',
    find: /academic/g,
    replace: '{{MODULE_NAME_CC}}'
  }
]

export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });