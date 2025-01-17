import fs from 'fs';

export default function (filePath, outputFilePath) {
  // Read the file content
  let content = fs.readFileSync(filePath, 'utf8');

  const replaces = [
    {
      find: /<ProjectReference Include="..\\Looplex.DotNet.WebApi\\Looplex.DotNet.WebApi.csproj" \/>\n/g,
      replace: ''
    },
    {
      find: /<ProjectReference Include="..\\services\\academic\\Looplex.DotNet.Samples.Academic.Infra\\Looplex.DotNet.Samples.Academic.Infra.csproj" \/>\n/g,
      replace: ''
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

export const file = 'src/Looplex.DotNet.Samples.WebApi/Looplex.DotNet.Samples.WebApi.csproj';
export const outputFile = '{{WEB_API_PROJECT_NAME}}/{{WEB_API_PROJECT_NAME}}.csproj';