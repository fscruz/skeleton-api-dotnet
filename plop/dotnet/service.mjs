import { readFileSync } from 'node:fs'
import ini from 'ini'
import { ANSWER_ALL_QUESTIONS, APPLICATION_ABSTRACTION_PROJECT_SFX, APPLICATION_PROJECT_SFX, CONFIG_CHOICE, CONFIG_SFX, CREATE_NEW_SOLUTION, DOMAIN_PROJECT_SFX, getConstant, INFRA_PROJECT_SFX, PLOP_DIRECTORY, REPLACER_OUTPUT_DIRECTORY, SERVICE_FOLDER, USE_SAMPLE_CONFIG } from '../../constants.mjs'
import { addProjectToSolution, createSolution, deleteDirectory, findSolutionsInsideFolder } from '../fileHelper.mjs'
import path from 'node:path'
import { loadConfig } from '../configHelper.mjs'
import { getQuestionsFromFiles } from '../plopHelper.mjs'

let solutions = [
  CREATE_NEW_SOLUTION
]
const plopDir = path.resolve(PLOP_DIRECTORY)
const replacerOutputDir = path.resolve(plopDir, REPLACER_OUTPUT_DIRECTORY)
const questions = getQuestionsFromFiles(
  [
    path.resolve(replacerOutputDir, `service-application${CONFIG_SFX}`),
    path.resolve(replacerOutputDir, `service-application-abstractions${CONFIG_SFX}`),
    path.resolve(replacerOutputDir, `service-domain${CONFIG_SFX}`),
    path.resolve(replacerOutputDir, `service-infra${CONFIG_SFX}`)
  ]
)

function addServiceProjectsToSolution (solutionFullPath, config) {
  const solutionPathWithoutName = path.dirname(solutionFullPath)
  // Add Application project to Solution
  const applicationProjectName = config.PROJECT_NAMESPACE + '.' + config.MODULE_NAME + '.' + APPLICATION_PROJECT_SFX
  const applicationProjectPath = path.resolve(solutionPathWithoutName, config.PROJECT_PATH, SERVICE_FOLDER, (config.MODULE_NAME).toLowerCase(), applicationProjectName, applicationProjectName + '.csproj')
  const applicationDefaultFolderInsideSolution = path.join(SERVICE_FOLDER, config.MODULE_NAME)
  addProjectToSolution(solutionFullPath, applicationProjectPath, applicationDefaultFolderInsideSolution)
  // Add Application.Abstraction project to Solution
  const applicationAbstractionProjectName = config.PROJECT_NAMESPACE + '.' + config.MODULE_NAME + '.' + APPLICATION_ABSTRACTION_PROJECT_SFX
  const applicationAbstractionProjectPath = path.resolve(solutionPathWithoutName, config.PROJECT_PATH, SERVICE_FOLDER, (config.MODULE_NAME).toLowerCase(), applicationAbstractionProjectName, applicationAbstractionProjectName + '.csproj')
  const applicationAbstractionDefaultFolderInsideSolution = path.join(SERVICE_FOLDER, config.MODULE_NAME)
  addProjectToSolution(solutionFullPath, applicationAbstractionProjectPath, applicationAbstractionDefaultFolderInsideSolution)
  // Add Domain project to Solution
  const domainProjectName = config.PROJECT_NAMESPACE + '.' + config.MODULE_NAME + '.' + DOMAIN_PROJECT_SFX
  const domainProjectPath = path.resolve(solutionPathWithoutName, config.PROJECT_PATH, SERVICE_FOLDER, (config.MODULE_NAME).toLowerCase(), domainProjectName, domainProjectName + '.csproj')
  const domainDefaultFolderInsideSolution = path.join(SERVICE_FOLDER, config.MODULE_NAME)
  addProjectToSolution(solutionFullPath, domainProjectPath, domainDefaultFolderInsideSolution)
  // Add Infra project to Solution
  const infraProjectName = config.PROJECT_NAMESPACE + '.' + config.MODULE_NAME + '.' + INFRA_PROJECT_SFX
  const infraProjectPath = path.resolve(solutionPathWithoutName, config.PROJECT_PATH, SERVICE_FOLDER, (config.MODULE_NAME).toLowerCase(), infraProjectName, infraProjectName + '.csproj')
  const infraDefaultFolderInsideSolution = path.join(SERVICE_FOLDER, config.MODULE_NAME)
  addProjectToSolution(solutionFullPath, infraProjectPath, infraDefaultFolderInsideSolution)
}
function setActions (plop) {
  plop.setActionType('loadConfig', function (answers, config, plop) {
    answers.config = loadConfig()
  })
  plop.setActionType('addServiceProjectsToSolution', function (answers, config, plop) {
    let solutionPath = answers.solutionName
    if (answers.chooseSolution === CREATE_NEW_SOLUTION) {
      solutionPath = path.resolve(answers.outputPath, answers.solutionName + '.sln')
      createSolution(answers.outputPath, answers.solutionName)
    }
    addServiceProjectsToSolution(solutionPath, answers.config)
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
        name: CONFIG_CHOICE,
        message: 'Do you want to use a config file or to answer all questions?',
        choices: [USE_SAMPLE_CONFIG, ANSWER_ALL_QUESTIONS]
      },
      ...questions
    ],
    actions: function (answers) {
      let configData = {}

      if (answers[CONFIG_CHOICE] === USE_SAMPLE_CONFIG) {
        // Load the sample config from the sample-config.ini file
        const sampleConfig = ini.parse(readFileSync(getConstant('ALLCONFIGPATH'), 'utf-8'))
        // const sampleConfig = ini.parse(readFileSync(ALLCONFIGPATHH), 'utf-8'))
        configData = { ...sampleConfig }
      } else {
        // Use the answers from the prompts
        configData = questions.reduce((total, current) => {
          total = { ...total, [current.name]: answers[current.name] }
          return total
        }, {})
      }
      return [
        {
          type: 'addMany',
          destination: answers.outputPath,

          templateFiles: ['plop/templates/\\{\\{PROJECT_PATH\\}\\}/services/**/*', 'plop/templates/\\{\\{PROJECT_PATH\\}\\}/services/**/.*'],
          base: 'plop/templates',
          data: configData, // Use the selected data for replacements
          force: true
        },
        {
          type: 'loadConfig'
        },
        {
          type: 'addServiceProjectsToSolution'
        }
      ]
    }
  }
}

export default dotnetServiceFactory
