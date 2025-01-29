import { readFileSync } from 'node:fs'
import ini from 'ini'
import { CREATE_NEW_SOLUTION, getConstant } from '../../constants.mjs'
import { addProjectToSolution, createSolution, deleteDirectory, findFileFullPathInFolder, findSolutionsInsideFolder } from '../fileHelper.mjs'
import path from 'node:path'

let solutions = [
  CREATE_NEW_SOLUTION
]
function addServiceProjectsToSolution (solutionFullPath) {
  const solutionPathWihtoutFileName = getFilePathWithoutFileName(solutionFullPath)
  const applicationProjectName = getApplicationProjectName()
  const applicationProjectPath = findFileFullPathInFolder(solutionFullPath, applicationProjectName)
  const applicationDefaultFolderInsideSolution = getApplicationDefaultFolderInsideSolution()
  addProjectToSolution(solutionFullPath, applicationProjectPath applicationDefaultFolderInsideSolution)
  //fazer os passos acima corretamente depois fazer o mesmo para os outros 3 projetos
}
function setActions (plop) {
  plop.setActionType('addServiceProjectsToSolution', function (answers, config, plop) {
    let solutionPath = answers.solutionName
    if (answers.chooseSolution === CREATE_NEW_SOLUTION) {
      solutionPath = path.resolve(answers.outputPath, answers.solutionName + '.sln')
      console.log(solutionPath, 'PATH NEW SOLUTION')
      createSolution(answers.outputPath, answers.solutionName)
    }
    addServiceProjectToSolution(solutionPath)
    console.log(solutionPath, 'PATH BLAAAA SOLUTION')
  })
}
function dotnetServiceFactory (plop) {
  setActions(plop)
  return {
    description: 'Generate a C# solution with options for sample config or custom input',
    prompts: [
      {
        type: 'input',
        name: 'outputPath',
        message: 'Output path:',
        default: getConstant('DEFAULT_OUTPUT_PATH')
      },
      {
        when (answers) {
          if (answers.outputPath && !path.isAbsolute(answers.outputPath)) {
            answers.outputPath = path.resolve(process.cwd(), answers.outputPath)
          }
          console.log('Output path will be ' + answers.outputPath)

          return answers.outputPath === getConstant('DEFAULT_OUTPUT_PATH')
        },
        type: 'list',
        name: 'cleanOutputPath',
        message: 'Clear Output path?',
        choices: ['yes', 'no'],
        default: 'no'
      },
      {
        // clear folder
        async when (context) {
          if (context.cleanOutputPath === 'yes') {
            await deleteDirectory(context.outputPath)
          }

          return false
        }
      },
      {
        // find solution in folder
        when (context) {
          if (context.cleanOutputPath !== 'yes') { solutions = solutions.concat(findSolutionsInsideFolder(context.outputPath)) }
          console.log(solutions, 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBB')
          return false
        }
      },
      {
        type: 'list',
        name: 'chooseSolution',
        message: 'Choose a solution or create a new one',
        choices: () => solutions
      },
      {
        when (answers) {
          if (answers.chooseSolution === CREATE_NEW_SOLUTION) {
            return true
          }
          answers.solutionName = answers.chooseSolution
          return false
        },
        type: 'input',
        name: 'solutionName',
        message: 'Type the new solution name:',
        default: 'MySolution'

      },
      // Conditional prompts for custom input if the user does not select the sample config
      {
        type: 'list',
        name: 'configChoice',
        message: 'Do you want to use a config file or to answer all questions?',
        choices: ['Use sample config', 'Answer all questions']
      }
    ],
    actions: function (answers) {
      let configData = {}

      if (answers.configChoice === 'Use sample config') {
        // Load the sample config from the sample-config.ini file
        const sampleConfig = ini.parse(readFileSync(getConstant('ALLCONFIGPATH'), 'utf-8'))
        // const sampleConfig = ini.parse(readFileSync(ALLCONFIGPATHH), 'utf-8'))
        configData = { ...sampleConfig }
      } else {
        // Use the answers from the prompts
        configData = {
          COMPANY_NAME: answers.COMPANY_NAME,
          SOLUTION_NAME: answers.SOLUTION_NAME,
          MICROSERVICE_NAME: answers.MICROSERVICE_NAME,
          SERVICE_NAME: answers.SERVICE_NAME,
          SERVICE_FOLDER: answers.SERVICE_FOLDER,
          RESOURCE_LOCATION: answers.RESOURCE_LOCATION,
          RESOURCE_NAME: answers.RESOURCE_NAME,
          RESOURCE_NAME_P: answers.RESOURCE_NAME_P,
          RESOURCE_SCHEMA_VERSION: answers.RESOURCE_SCHEMA_VERSION,
          TELEMETRY_SERVICE_NAME: answers.TELEMETRY_SERVICE_NAME,
          DB_SERVER: answers.DB_SERVER,
          DB_PORT: answers.DB_PORT,
          DB_USER: answers.DB_USER,
          DB_PASSWORD: answers.DB_PASSWORD,
          DB_DATABASE: answers.DB_DATABASE
        }
      }
      console.log(answers.outputPath, 'BLASTOISE', path.resolve(process.cwd(), 'plop/templates/**/*'), configData, path.resolve('plop/templates/{{PROJECT_PATH}}/services/**/*'))
      return [
        {
          type: 'addMany',
          destination: answers.outputPath,

          // templateFiles: ['plop/templates/{{PROJECT_PATH}}/services/**/*', 'plop/templates/{{PROJECT_PATH}}/services/**/.*'],
          templateFiles: ['plop/templates/**/*', 'plop/templates/**/.*'],
          base: 'plop/templates',
          data: configData, // Use the selected data for replacements
          force: true
        },
        {
          type: 'addServiceProjectsToSolution'
        }
      ]
    }
  }
}

export default dotnetServiceFactory
