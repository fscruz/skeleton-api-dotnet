import fs from 'fs';

export default function (filePath, outputFilePath) {
    fs.copyFileSync(filePath, outputFilePath);
    return [];
}
export const file = 'test/Looplex.DotNet.Samples.IntegrationTests/Looplex.DotNet.Samples.IntegrationTests.csproj';
export const outputFile = '{{TESTPROJECT_PATH}}/{{PROJECT_NAMESPACE}}.IntegrationTests/{{PROJECT_NAMESPACE}}.IntegrationTests.csproj';
