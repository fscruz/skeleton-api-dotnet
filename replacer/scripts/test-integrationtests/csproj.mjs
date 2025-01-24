import { copyProjectFile } from '../../utils/file-operations.mjs';

export default copyProjectFile;

export const file = 'test/Looplex.DotNet.Samples.IntegrationTests/Looplex.DotNet.Samples.IntegrationTests.csproj';
export const outputFile = '{{TESTPROJECT_PATH}}/{{PROJECT_NAMESPACE}}.IntegrationTests/{{PROJECT_NAMESPACE}}.IntegrationTests.csproj';
