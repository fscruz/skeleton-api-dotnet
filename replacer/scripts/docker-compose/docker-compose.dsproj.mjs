import fs from 'fs';

export default function (filePath, outputFilePath) {
  // Read the file content
  let content = fs.readFileSync(filePath, 'utf8');

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

  replaces.filter(replace => replace.find).forEach(replace => {
    content = content
      .replace(replace.find, replace.replace);
  });
  fs.writeFileSync(outputFilePath, content, 'utf8');
  console.log(`Processed file saved to: ${outputFilePath}`);

  return replaces;
}

export const file = 'src/docker/docker-compose.dcproj';
export const outputFile = '{{DOCKER_PROJECT_FOLDER_NAME}}/docker-compose.dcproj';