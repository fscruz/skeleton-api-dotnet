import { CommandProcessor } from '../../utils/commandProcessor.mjs';
export default (filePath, outputFilePath) => 
  CommandProcessor.process({
    filePath,
    outputFilePath,
    patterns: replaces
  });

export const file = 'test/Looplex.DotNet.Samples.Academic.Application.UnitTests/Services/StudentServiceTests.cs';
export const outputFile = '{{TESTPROJECT_PATH}}/{{PROJECT_NAMESPACE}}.{{MODULE_NAME}}.Application.UnitTests/Services/{{RESOURCE_TYPE_NAME}}ServiceTests.cs';
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
  }
  ,
  {
    original: 'academic',
    find: /academic/g,
    replace: '{{MODULE_NAME_CC}}'
  },
  {
    original: 'test',
    replace: '{{TESTPROJECT_PATH}}'
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