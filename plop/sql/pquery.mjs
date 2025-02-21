import {
  ALLCONFIGPATH, ANSWER_ALL_QUESTIONS,
  CONFIG_CHOICE, CONFIG_SFX, DEFAULT_OUTPUT_PATH,
  PLOP_DIRECTORY, SQL_DIRECTORY,
  USE_SAMPLE_CONFIG
} from "../../constants.mjs";
import {readFileSync} from "node:fs";
import ini from "ini";
import path from "node:path";
import {getQuestionsFromFiles} from "../plopHelper.mjs";

const plopDir = path.resolve(PLOP_DIRECTORY)
const plopSqlDir = path.resolve(plopDir, SQL_DIRECTORY)

const questions = getQuestionsFromFiles(
  [
    path.resolve(plopSqlDir, `pquery${CONFIG_SFX}`),
  ]
)
function sqlPQueryFactory(plop) {
  return {
    description: 'Generate a paginated storage procedure',
    prompts: [
      {
        type: 'input',
        name: 'outputPath',
        message: 'Output path:',
        default: DEFAULT_OUTPUT_PATH
      },
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
        const sampleConfig = ini.parse(readFileSync(path.resolve(plopSqlDir, 'pquery.config.sample.ini'), 'utf-8'))
        configData = { ...sampleConfig }
        configData.PARAMS = configData.PARAMS.split(',').map(s =>
        {
          let v = s.split(':')
          return {
            name: v[0],
            type: v[1]
          }
        })
      } else {
        // Use the answers from the prompts
        configData = questions.reduce((acc, current) => {
          acc[current.name] = answers[current.name]
          return acc
        }, {})
        answers.config = configData
      }
      return [
        {
          type: 'addMany',
          destination: answers.outputPath,

          templateFiles: ['plop/sql/templates/USP_{\\{RESOURCE\\}\\}_pquery.sql'
          ],
          base: 'plop/sql/templates',
          data: configData, // Use the selected data for replacements
          force: true
        }
      ]
    }
  }
}

export default sqlPQueryFactory