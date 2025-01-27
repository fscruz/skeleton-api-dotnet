import { CommandProcessor } from '../../utils/commandProcessor.mjs';

export const file = 'src/services/academic/Looplex.DotNet.Samples.Academic.Infra/Ioc/AcademicDependencyContainer.cs';
export const outputFile = '{{PROJECT_PATH}}/services/{{CC MODULE_NAME}}/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Infra/Ioc/{{CC MODULE_NAME}}DependencyContainer.cs';
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
    replace: '{{PROJECT_NAMESPACE}}'
  },
  {
    original: 'Academic',
    find: /Academic/g,
    replace: '{{MODULE_NAME}}'
  }
  ,
  {
    original: 'Academic',
    find: /academic/g,
    replace: '{{CC MODULE_NAME}}'
  }
]

export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });