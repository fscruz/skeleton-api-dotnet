import { copyProjectFile } from '../../utils/file-operations.mjs';

export default copyProjectFile;

export const file = 'src/docker/.dockerignore';
export const outputFile = '{{PROJECT_PATH}}/docker/.dockerignore';