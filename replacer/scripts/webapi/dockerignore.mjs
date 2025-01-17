import fs from 'fs';

export default function (filePath, outputFilePath) {
    fs.copyFileSync(filePath, outputFilePath);
    return [];
}

export const file = 'src/Looplex.DotNet.Samples.WebAPI/.dockerignore';
export const outputFile = '{{WEB_API_PROJECT_NAME}}/.dockerignore';