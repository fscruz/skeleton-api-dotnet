import { CommandProcessor } from '../../utils/commandProcessor.mjs';
export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });


export const file = 'src/services/academic/Looplex.DotNet.Samples.Academic.Application/Services/StudentService.cs';
export const outputFile = '{PROJECT_PATH}/services/{{MODULE_NAME_CC}}/{{PROJECT_NAMESPACE}}.{MODULE_NAME}.Application/Services/{{RESOURCE_TYPE_NAME}}Service.cs';

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
]