import { copyProjectFile } from '../../utils/file-operations.mjs';

export default copyProjectFile;

export const file = 'src/Looplex.DotNet.Samples.WebAPI/appsettings.Development.json';
export const outputFile = '{{WEB_API_PROJECT_NAME}}/appsettings.Development.json';