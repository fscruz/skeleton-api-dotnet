import { copyProjectFile } from '../../utils/file-operations.mjs';

export default copyProjectFile;

export const file = 'src/Looplex.DotNet.Samples.WebAPI/.dockerignore';
export const outputFile = '{{WEB_API_PROJECT_NAME}}/.dockerignore';