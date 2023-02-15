import { NextApiRequest, NextApiResponse } from "next"
import generateBoard from "@/lib/network/openai/generateBoard"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const projectDescription = JSON.parse(req.body).projectDescription
      const response = await generateBoard(projectDescription)

      let data = response.data.choices[0].text
      console.log(`Pre Parse Result: ${data}`)

      let projectBoardData: ProjectBoard
      if (data != undefined) {
        projectBoardData = JSON.parse(JSON.stringify(data))
        console.log(`Post Parse Result: ${projectBoardData}`)
        res.status(200).json(projectBoardData)
      }
      // res.status(500).json({ message: "Error generating project board." })
      break
    default:
      const error = "Request method not accounted for."
      res.status(500).json({ message: error })
      console.error(error)
      break
  }
}
