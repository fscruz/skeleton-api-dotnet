import { copyProjectFile } from '../../utils/file-operations.mjs';

export default copyProjectFile;

export const file = 'src/Looplex.DotNet.Samples.WebApi/appsettings.Development.json';
export const outputFile = '{{PROJECT_NAMESPACE}}.WebApi/appsettings.Development.json';