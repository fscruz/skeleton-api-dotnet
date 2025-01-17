import fs from 'fs';

export default function (filePath, outputFilePath) {
  // Read the file content
  let content = fs.readFileSync(filePath, 'utf8');

  const replaces = [
    {
      original: 'Looplex.DotNet.Samples.WebApi',
      find: /Looplex.DotNet.Samples.WebApi/g,
      replace: '{{WEB_API_PROJECT_NAME}}'
    },
    {
      original: 'looplex.dotnet.samples.academic.db',
      find: /looplex.dotnet.samples.academic.db/g,
      replace: '{{SERVICE_DB_HOST}}'
    },
    {
      original: '1433',
      find: /1433/g,
      replace: '{{SERVICE_DB_PORT}}'
    },
    {
      original: 'dotnetsamples',
      find: /dotnetsamples/g,
      replace: '{{SERVICE_DB_NAME}}'
    },
    {
      original: 'samplesUser',
      find: /samplesUser/g,
      replace: '{{SERVICE_DB_USER}}'
    },
    {
      original: '!ooplex_D0tNet!',
      find: /!ooplex_D0tNet!/g,
      replace: '{{SERVICE_DB_PASSWORD}}'
    }
  ]

  replaces.forEach(replace => {
    content = content
      .replace(replace.find, replace.replace);
  });
  fs.writeFileSync(outputFilePath, content, 'utf8');
  console.log(`Processed file saved to: ${outputFilePath}`);

  return replaces;
}

export const file = 'src/Looplex.DotNet.Samples.WebApi/Services/InMemorySecretsService.cs';
export const outputFile = '{{WEB_API_PROJECT_NAME}}/Services/InMemorySecretsService.cs';