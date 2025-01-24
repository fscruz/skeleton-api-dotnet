import { CommandProcessor } from '../../utils/commandProcessor.mjs';

export const file = 'src/Looplex.DotNet.Samples.WebApi/Looplex.DotNet.Samples.WebApi.csproj';
export const outputFile = '{{PROJECT_PATH}}/{{PROJECT_NAMESPACE}}.WebApi/{{PROJECT_NAMESPACE}}.WebApi.csproj';
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

export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });
