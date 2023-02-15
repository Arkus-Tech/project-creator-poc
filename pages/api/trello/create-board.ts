import type { NextApiRequest, NextApiResponse } from "next"
import process from "process"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const body: TrelloReqBody = JSON.parse(req.body)
      console.log(`Body - project name: ${body.boardName}`)
      const trelloApiKey = process.env.TRELLO_API_KEY
      const boardName = encodeURIComponent(body.boardName)
      const url = `https://api.trello.com/1/boards/?name=${boardName}&key=${trelloApiKey}&token=${body.trelloToken}`
      console.log(`URL: ${url}`)
      const response = await fetch(url, {
        method: "POST",
      })
      res.status(response.status).json(response.body)

      break
    default:
      const error = "Request method not accounted for."
      res.status(500).json({ message: error })
      console.error(error)
      break
  }
}
