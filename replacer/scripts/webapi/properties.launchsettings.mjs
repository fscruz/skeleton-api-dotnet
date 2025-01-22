import { copyProjectFile } from '../../utils/file-operations.mjs';

export default copyProjectFile;

export const file = 'src/Looplex.DotNet.Samples.WebAPI/Properties/launchSettings.json';
export const outputFile = '{{WEB_API_PROJECT_NAME}}/Properties/launchSettings.json';