import fs from 'fs';

export function copyProjectFile(filePath, outputFilePath) {
  try {
    fs.copyFileSync(filePath, outputFilePath);
    return [];
  } catch (error) {
    throw new Error(`Failed to copy file from ${filePath} to ${outputFilePath}: ${error.message}`);
  }
}