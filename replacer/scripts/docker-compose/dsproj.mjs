import { CommandProcessor } from '../../utils/commandProcessor.mjs';

export const file = 'src/docker/docker-compose.dcproj';
export const outputFile = '{{PROJECT_PATH}}/docker/docker-compose.dcproj';
const replaces = [
  {
    original: 'looplex.dotnet.samples',
    find: /looplex.dotnet.samples/g,
    replace: '{{DOCKER_SERVICE_NAME}}'
  },
  {
    original: 'docker',
    key: '{{DOCKER_PROJECT_FOLDER_NAME}}',
  }
];

export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });