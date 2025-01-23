import { CommandProcessor } from '../../utils/commandProcessor.mjs';

export const file = 'src/Looplex.DotNet.Samples.WebApi/Routes/Academic/StudentsRoutes.cs';
export const outputFile = '{{PROJECT_PATH}}/{{PROJECT_NAMESPACE}}.WebApi/Routes/{{MODULE_NAME}}/{{RESOURCE_TYPE_NAME}}Routes.cs';
const replaces = [
  {
    find: /using Looplex.DotNet.Samples.Academic.Application.Abstractions.Services;\n/g,
    replace: ''
  },
  {
    find: /using Looplex.DotNet.Samples.Academic.Application.Services;\n/g,
    replace: ''
  },
  {
    find: /using Looplex.DotNet.Samples.Academic.Domain.Entities.Students;\n/g,
    replace: ''
  },
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
    original: 'Looplex.DotNet.Samples.WebApi',
    find: /Looplex.DotNet.Samples.WebApi/g,
    replace: '{{PROJECT_NAMESPACE}}.WebApi'
  }
]

export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });