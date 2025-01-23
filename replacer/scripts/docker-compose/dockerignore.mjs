import fs from 'fs';

export default function (filePath, outputFilePath) {
    fs.copyFileSync(filePath, outputFilePath);
    return [];
}

export const file = 'src/docker/.dockerignore';
export const outputFile = '{{DOCKER_PROJECT_FOLDER_NAME}}/.dockerignore';