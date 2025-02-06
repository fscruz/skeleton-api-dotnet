import { CommandProcessor } from '../../utils/commandProcessor.mjs'

export const file = 'src/services/academic/Looplex.DotNet.Samples.Academic.Infra/WebApi/AcademicRoutes.cs'
export const outputFile = '{{PROJECT_PATH}}/services/{{CC MODULE_NAME}}/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Infra/WebApi/{{MODULE_NAME}}Routes.cs'
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

export default (filePath, outputFilePath) =>
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  })
