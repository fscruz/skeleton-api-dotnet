import { copyProjectFile } from '../../utils/file-operations.mjs';

export default copyProjectFile;

export const file = 'test/Looplex.DotNet.Samples.Academic.Application.UnitTests/Looplex.DotNet.Samples.Academic.Application.UnitTests.csproj';
export const outputFile = '{{TESTPROJECT_PATH}}/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Application.UnitTests/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Application.UnitTests.csproj';