import { CommandProcessor } from '../../utils/commandProcessor.mjs';

export const file = 'test/Looplex.DotNet.Samples.Academic.Infra.IntegrationTests/Data/Commands/UpdateStudentCommandHandlerTest.cs';
export const outputFile = '{{TESTPROJECT_PATH}}/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Infra.IntegrationTests/Data/Commands/Update{{RESOURCE_TYPE_NAME}}CommandHandlerTest.cs';
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
  },
  {
    original: '',
    find: /QuerieHandlers/g,
    replace: 'QueryHandlers'
  },
  {
    original: 'Projects',
    find: /Projects/g,
    replace: '{{RESOURCE_TYPE_NAME}}Children'
  },
  {
    original: 'Project',
    find: /Project/g,
    replace: '{{RESOURCE_TYPE_NAME}}Child'
  },
  {
    original: 'Projects',
    find: /projects/g,
    replace: '{{CC RESOURCE_TYPE_NAME}}Children'
  },
  {
    original: 'Project',
    find: /project/g,
    replace: '{{CC RESOURCE_TYPE_NAME}}Child'
  }
]

export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });