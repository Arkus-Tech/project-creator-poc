import type { NextApiRequest, NextApiResponse } from "next"
import populateProjectBoard from "@/lib/network/trello/populateProjectBoard"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const body: TrelloReqBody = JSON.parse(req.body)
      const projectBoard: ProjectBoard = body.boardData
      try {
        await populateProjectBoard(projectBoard, body.trelloToken)
        res.status(200).json(true)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: error })
      }

      break
    default:
      const error = "Request method not accounted for."
      res.status(500).json({ message: error })
      console.error(error)
      break
  }
}
