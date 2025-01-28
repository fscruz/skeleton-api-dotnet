import { CommandProcessor } from '../../utils/commandProcessor.mjs';

export const file = 'src/services/academic/Looplex.DotNet.Samples.Academic.Infra/Data/CommandHandlers/DeleteStudentCommandHandler.cs';
export const outputFile = '{{PROJECT_PATH}}/services/{{CC MODULE_NAME}}/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Infra/Data/CommandHandlers/Delete{{RESOURCE_TYPE_NAME}}CommandHandler.cs';
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
      replace: '{{LC RESOURCE_TYPE_NAME_P}}'
  },
  {
    original: 'Student',
    find: /student/g,
    replace: '{{LC RESOURCE_TYPE_NAME}}'
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
    replace: '{{LC RESOURCE_TYPE_NAME}}children'
  },
  {
    original: 'Project',
    find: /project/g,
    replace: '{{LC RESOURCE_TYPE_NAME}}child'
  }
]

export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });