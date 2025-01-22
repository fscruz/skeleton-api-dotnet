import { CommandProcessor } from '../../utils/commandProcessor.mjs';
export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });

export const file = 'src/Looplex.DotNet.Samples.WebApi/Routes/Academic/StudentsRoutes.cs';
export const outputFile = '{{WEB_API_PROJECT_NAME}}/Routes/{{SERVICE_NAME_P}}/{{RESOURCE_TYPE_NAME}}Routes.cs';
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
    replace: '{{WEB_API_PROJECT_NAME}}'
  }
]