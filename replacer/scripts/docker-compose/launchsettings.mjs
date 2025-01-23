import { copyProjectFile } from '../../utils/file-operations.mjs';

export default copyProjectFile;

export const file = 'src/docker/launchSettings.json';
export const outputFile = '{{PROJECT_PATH}}/docker/launchSettings.json';