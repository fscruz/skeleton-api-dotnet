import { copyProjectFile } from '../../utils/file-operations.mjs';

export default copyProjectFile;

export const file = 'src/services/academic/Looplex.DotNet.Samples.Academic.Application.Abstractions/Looplex.DotNet.Samples.Academic.Application.Abstractions.csproj';
export const outputFile = '{{PROJECT_PATH}}/services/{{CC MODULE_NAME}}/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Application.Abstractions/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Application.Abstractions.csproj';