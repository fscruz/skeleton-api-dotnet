import { copyProjectFile } from '../../utils/file-operations.mjs';

export default copyProjectFile;

export const file = 'src/Looplex.DotNet.Samples.WebAPI/Properties/launchSettings.json';
export const outputFile = '{{PROJECT_PATH}}/{{PROJECT_NAMESPACE}}.WebApi/Properties/launchSettings.json';