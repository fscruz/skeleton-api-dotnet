import { ANSWER_ALL_QUESTIONS, CONFIG_CHOICE } from '../constants.mjs'
import { getAllLinesFromFile } from './fileHelper.mjs'

export function getQuestionsFromFiles (filePaths) {
  if (!filePaths || filePaths.length === 0) throw new Error('provide config path to extract questions')

  const questions = []
  const keysAdded = []
  for (let i = 0; i < filePaths.length; i++) {
    const lines = getAllLinesFromFile(filePaths[i])

    if (!lines || lines.length === 0) continue

    for (let j = 0; j < lines.length; j++) {
      const splittedByEqual = lines[j].split('=')
      const key = splittedByEqual[0]
      if (key.length > 0 && !keysAdded.includes(key)) {
        const question = {
          type: 'input',
          name: key,
          message: key + ':',
          when (answer) {
            return answer[CONFIG_CHOICE] === ANSWER_ALL_QUESTIONS
          }
        }
        keysAdded.push(key)
        questions.push(question)
      }
    }
  }
  console.log('QUESTIONS', questions)
  return questions
}
