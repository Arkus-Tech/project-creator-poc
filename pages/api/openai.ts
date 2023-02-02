import type { NextApiRequest, NextApiResponse } from "next"
import getProjectName from "@/helpers/openai/getProjectName"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const response = await getProjectName(req.body.project)
      res.status(200).json({ name: response })
      break
    default:
      const error = "Request method not accounted for."
      res.status(200).json({ message: error })
      console.error(error)
      break
  }
}
