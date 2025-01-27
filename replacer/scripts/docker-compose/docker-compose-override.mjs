import { CommandProcessor } from '../../utils/commandProcessor.mjs';


export const file = 'src/docker/docker-compose.override.yml';
export const outputFile = '{{PROJECT_PATH}}/docker/docker-compose.override.yml';
const replaces = [
    {
        original: 'looplex.dotnet.samples',
        find: /looplex.dotnet.samples/g,
        replace: '{{LC PROJECT_NAMESPACE}}'
    },
    {
        original: 'academic',
        find: /academic/g,
        replace: '{{LC MODULE_NAME}}'
    },
    {
        original: '8080',
        find: /8080/g,
        replace: '{{WEBAPI_CONTAINER_PORT_HTTP}}'
    },
    {
        original: '8443',
        find: /8443/g,
        replace: '{{WEBAPI_CONTAINER_PORT_HTTPS}}'
    },
    {
        original: '1433',
        find: /1433/g,
        replace: '{{ROUTING_DB_CONTAINER_PORT}}'
    },
    {
        original: '1435',
        find: /1435/g,
        replace: '{{SERVICE_DB_CONTAINER_PORT}}'
    },
    {
        original: '!ooplex_D0tNet!s@',
        find: /!ooplex_D0tNet!s@/g,
        replace: '{{SERVICE_DB_PASSWORD}}'
    }
  ];

  export default (filePath, outputFilePath) => 
    CommandProcessor.process({
      filePath,
      outputFilePath,
      patterns: replaces
    });