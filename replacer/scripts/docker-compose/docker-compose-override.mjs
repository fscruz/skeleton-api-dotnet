import fs from 'fs';

export default function (filePath, outputFilePath) {
  // Read the file content
  let content = fs.readFileSync(filePath, 'utf8');

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

  replaces.forEach(replace => {
    content = content
      .replace(replace.find, replace.replace);
  });
  fs.writeFileSync(outputFilePath, content, 'utf8');
  console.log(`Processed file saved to: ${outputFilePath}`);

  return replaces;
}

export const file = 'src/docker/docker-compose.override.yml';
export const outputFile = '{{DOCKER_PROJECT_FOLDER_NAME}}/docker-compose.override.yml';