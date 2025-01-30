import fs from 'fs'
import path from 'node:path'
import { rm } from 'node:fs'
import { pathToFileURL } from 'url'
import { exec } from 'child_process'

export function clearFolder (folderPath) {
  fs.readdir(folderPath, (err, files) => {
    if (err) throw err

    for (const file of files) {
      const filePath = path.join(folderPath, file)
      fs.lstat(filePath, (err, stats) => {
        if (err) throw err
        if (stats.isDirectory()) {
          deleteDirectory(pathToFileURL(path.join(process.cwd(), filePath).pathname))
          fs.rmdir(filePath, (err) => {
            if (err) throw err
          })
        } else {
          fs.unlink(filePath, (err) => {
            if (err) throw err
          })
        }
      })
    }
  })
}
export function deleteDirectory (folderPath, resolve, reject) {
  return new Promise((resolve, reject) => {
    rm(folderPath, { recursive: true, force: true }, (err) => {
      if (err) {
        reject(new Error(`Failed to delete directory: ${folderPath}. Error: ${err.message}`))
      } else {
        console.log(`Deleted output directory: ${folderPath}`)
        resolve('Directory deleted successfully')
      }
    })
  })
}

export function findSolutionsInsideFolder (startPath) {
  let solutionsFound = []

  const files = fs.readdirSync(startPath)
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i])
    const stat = fs.lstatSync(filename)
    if (stat.isDirectory()) {
      solutionsFound = solutionsFound.concat(findSolutionsInsideFolder(filename)) // recurse
    } else if (filename.endsWith('.sln')) {
      solutionsFound.push(filename)
    };
  };
  return solutionsFound
}

export function createSolution (solutionPath, solutionName) {
  exec(`dotnet new sln -o "${solutionPath}" -n "${solutionName}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`)
    }
  })
}
export function findFileFullPathInFolder (whereToFind, fileToFind) {

}
export function addProjectToSolution (solutionFullPath, projectFullPath, foldersInsideSolution) {
  let cmd = `dotnet  sln "${solutionFullPath}" add "${projectFullPath}"`

  if (foldersInsideSolution && foldersInsideSolution !== '') {
    cmd = cmd + `--solution-folder ${foldersInsideSolution}`
  }
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`)
    }
  })
}
