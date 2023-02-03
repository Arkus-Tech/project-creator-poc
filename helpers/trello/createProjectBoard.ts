import * as process from "process"

export default async function createProjectBoard(boardName: String) {
  console.log(`Create Board Name: ${boardName}`)
  const trelloApiKey = process.env.TRELLO_API_KEY
  const trelloToken = process.env.TRELLO_TOKEN
  return await fetch(
    `https://api.trello.com/1/boards/?name=${boardName}&key=${trelloApiKey}&token=${trelloToken}`,
    {
      method: "POST",
    }
  )
}
