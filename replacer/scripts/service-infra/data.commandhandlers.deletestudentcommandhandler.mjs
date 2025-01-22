import fs from 'fs';

export default function (filePath, outputFilePath) {
     // Read the file content
      let content = fs.readFileSync(filePath, 'utf8');
    
      const replaces = [
        {
            original: 'Students',
            find: /Students/g,
            replace: '{{RESOURCE_TYPE_NAME_P}}'
        },
        {
          original: 'Student',
          find: /Student/g,
          replace: '{{RESOURCE_TYPE_NAME}}'
        },
        {
            original: 'students',
            find: /students/g,
            replace: '{{RESOURCE_TYPE_NAME_CCP}}'
        },
        {
          original: 'student',
          find: /student/g,
          replace: '{{RESOURCE_TYPE_NAME_CC}}'
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
        },
        {
          original: 'Projects',
          find: /Projects/g,
          replace: '{{RESOURCE_TYPE_NAME}}Children'
        },
        {
          original: 'Project',
          find: /Project/g,
          replace: '{{RESOURCE_TYPE_NAME}}Child'
        },
        {
          original: 'projects',
          find: /projects/g,
          replace: '{{RESOURCE_TYPE_NAME_LC}}children'
        },
        {
          original: 'project',
          find: /project/g,
          replace: '{{RESOURCE_TYPE_NAME_LC}}child'
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

export const file = 'src/services/academic/Looplex.DotNet.Samples.Academic.Infra/Data/CommandHandlers/DeleteStudentCommandHandler.cs';
export const outputFile = '{PROJECT_PATH}/services/{{MODULE_NAME_CC}}/{{PROJECT_NAMESPACE}}.{MODULE_NAME}.Infra/Data/CommandHandlers/Delete{{RESOURCE_TYPE_NAME}}CommandHandler.cs';