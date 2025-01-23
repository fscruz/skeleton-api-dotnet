import fs from 'fs';

export default function (filePath, outputFilePath) {
    fs.copyFileSync(filePath, outputFilePath);
    return [];
}
export const file = 'src/services/academic/Looplex.DotNet.Samples.Academic.Application.Abstractions/Looplex.DotNet.Samples.Academic.Application.Abstractions.csproj';
export const outputFile = '{{PROJECT_PATH}}/services/{{PROJECT_MODULE_NAME_LOWERCASE}}/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Application.Abstractions/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Application.Abstractions.csproj';