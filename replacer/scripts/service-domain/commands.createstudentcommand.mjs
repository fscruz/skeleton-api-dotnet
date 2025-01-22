import fs from 'fs';

export default function (filePath, outputFilePath) {
     // Read the file content
      let content = fs.readFileSync(filePath, 'utf8');
    
      const replaces = [
        {
          original: 'Student',
          find: /Student/g,
          replace: '{{RESOURCE_TYPE_NAME}}'
        },
        {
          original: 'Looplex.DotNet.Samples',
          find: /Looplex.DotNet.Samples/g,
          replace: '{{PROJECT_NAMESPACE}}'
        },
        {
          original: 'Academic',
          find: /Academic/g,
          replace: '{{MODULE_NAME}}'
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

export const file = 'src/services/academic/Looplex.DotNet.Samples.Academic.Domain/Commands/CreateStudentCommand.cs';
export const outputFile = '{PROJECT_PATH}/services/{{MODULE_NAME_CC}}/{{PROJECT_NAMESPACE}}.{MODULE_NAME}.Domain/Commands/Create{{RESOURCE_TYPE_NAME}}Command.cs';