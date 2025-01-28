import { CommandProcessor } from '../../utils/commandProcessor.mjs';


export const file = 'src/docker/docker-compose.yml';
export const outputFile = '{{PROJECT_PATH}}/docker/docker-compose.yml';
const replaces = [
    {
        original: 'Looplex.Dotnet.Samples',
        find: /looplex.dotnet.samples/g,
        replace: '{{LC PROJECT_NAMESPACE}}'
    },
    {
        original: 'Looplex.DotNet.Samples',
        find: /Looplex.DotNet.Samples/g,
        replace: '{{PROJECT_NAMESPACE}}'
    },
    {
        original: 'dbdata-samples-routing',
        find: /dbdata-samples-routing/g,
        replace: '{{ROUTING_DB_CONTAINER_VOLUME}}'
    },
    {
        original: 'dbdata-samples-academic',
        find: /dbdata-samples-academic/g,
        replace: '{{SERVICE_DB_CONTAINER_VOLUME}}'
    },
    {
        original: 'SampleApi/Student.1.0.schema.json',
        find: /SampleApi\/Student.1.0.schema.json/g,
        replace: '{{RESOURCE_TYPE_SCHEMA_PATH}}'
    },
    {
        original: 'Student',
        find: /Student/g,
        replace: '{{RESOURCE_TYPE_NAME}}'
    },
    {
        original: 'Academic',
        find: /academic/g,
        replace: '{{LC MODULE_NAME}}'
    }
  ];

  export default (filePath, outputFilePath) => 
    CommandProcessor.process({
      filePath,
      outputFilePath,
      patterns: replaces
    });