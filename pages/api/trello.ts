import type { NextApiRequest, NextApiResponse } from "next"
import createProjectBoard from "@/helpers/trello/createProjectBoard"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const body = req.query.boardName
      console.log(`Request Body Name: ${req.body.boardName}`)
      const response = await createProjectBoard(
        // @ts-ignore
        req.query.boardName.toString()
      )
      res.status(200).json(response)

      break
    default:
      const error = "Request method not accounted for."
      res.status(500).json({ message: error })
      console.error(error)
      break
  }
}
