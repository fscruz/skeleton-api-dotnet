import fs from 'fs';

export default function (filePath, outputFilePath) {
  // Read the file content
  let content = fs.readFileSync(filePath, 'utf8');

  const replaces = [
    {
      find: /using Looplex.DotNet.WebApi;\n/g,
      replace: ''
    },
    {
      find: /using Looplex.DotNet.Samples.Academic.Infra.IoC;\n/g,
      replace: ''
    },
    {
      original: 'Looplex.DotNet.Samples.WebApi',
      find: /Looplex.DotNet.Samples.WebApi/g,
      replace: '{{WEB_API_PROJECT_NAME}}'
    },
    {
      original: 'Student',
      find: /Student/g,
      replace: '{{RESOURCE_TYPE_NAME}}'
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

export const file = 'src/Looplex.DotNet.Samples.WebApi/Program.cs';
export const outputFile = '{{WEB_API_PROJECT_NAME}}/Program.cs';