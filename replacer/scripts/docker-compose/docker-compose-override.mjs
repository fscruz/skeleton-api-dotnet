import { CommandProcessor } from '../../utils/commandProcessor.mjs';


export const file = 'src/docker/docker-compose.override.yml';
export const outputFile = '{{PROJECT_PATH}}/docker/docker-compose.override.yml';
const replaces = [
    {
        original: 'looplex.dotnet.samples.webapi',
        find: /looplex.dotnet.samples.webapi/g,
        replace: '{{WEBAPI_DOCKER_CONTAINER_NAME}}'
    },
    {
        original: 'looplex.dotnet.samples.routing.db',
        find: /looplex.dotnet.samples.routing.db/g,
        replace: '{{ROUTING_DB_DOCKER_CONTAINER_NAME}}'
    },
    {
        original: 'looplex.dotnet.samples.academic.db',
        find: /looplex.dotnet.samples.academic.db/g,
        replace: '{{SERVICE_DB_DOCKER_CONTAINER_NAME}}'
    }
  ];

  export default (filePath, outputFilePath) => 
    CommandProcessor.process({
      filePath,
      outputFilePath,
      patterns: replaces
    });