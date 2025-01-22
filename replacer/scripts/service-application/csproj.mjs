import fs from 'fs';

export default function (filePath, outputFilePath) {
  fs.copyFileSync(filePath, outputFilePath);
  return [];
}

export const file = 'src/services/academic/Looplex.DotNet.Samples.Academic.Application/Looplex.DotNet.Samples.Academic.Application.csproj';
export const outputFile = '{PROJECT_PATH}/services/{{MODULE_NAME_CC}}/{{PROJECT_NAMESPACE}}.{MODULE_NAME}.Application/{{PROJECT_NAMESPACE}}.{MODULE_NAME}.Application.csproj';