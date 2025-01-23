import { copyProjectFile } from '../../utils/file-operations.mjs';

export default copyProjectFile;

export const file = 'src/services/academic/Looplex.DotNet.Samples.Academic.Domain/Looplex.DotNet.Samples.Academic.Domain.csproj';
export const outputFile = '{PROJECT_PATH}/services/{{MODULE_NAME_CC}}/{{PROJECT_NAMESPACE}}.{MODULE_NAME}.Domain/{{PROJECT_NAMESPACE}}.{MODULE_NAME}.Domain.csproj';