import { NextApiRequest, NextApiResponse } from "next"
import { openai } from "@/lib/openai"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const projectDescription = JSON.parse(req.body).projectDescription
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `I want to start a new project. I'm going to make a new Trello board with tasks to complete my project. Generate a name for my project. Take in the description of my project and generate a JSON that matches the following format:\n\ntype Project {\n  projectName: string,\n  ticketList: List of Ticket,\n}\ntype Ticket {\n  title: string,\n  scope: string,\n  acceptance criteria: List of string // one string per criteria\n  helpfulResources: List of string\n}\n\nPlease help me see my project to the finish line! Here's a description of my project:\n\n ${projectDescription}.`,
        temperature: 0.7,
        max_tokens: 3521,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })

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
