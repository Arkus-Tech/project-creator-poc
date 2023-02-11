import { openai } from "@/lib/openai/index"

export default async function generateBoard(projectDescription: String) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `
    I want to start a new project. I'm going to make a new Trello board with tasks to complete my project. Generate a name for my project. Take in the description of my project and generate a JSON that matches the following format:

    type Project {
      projectName: string,
      ticketList: List of Ticket,
    }
    type Ticket {
      title: string,
      scope: string,
      acceptance criteria: List of string // one string per criteria
      helpfulResources: List of string
    }

    Please help me see my project to the finish line! Here's a description of my project:

    ${projectDescription}.
        `,
    temperature: 0.7,
    max_tokens: 3521,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  let data = await response.data.choices[0].text

  let projectBoardData: ProjectBoard
  if (data != undefined) {
    projectBoardData = JSON.parse(data)
    console.log(`Result: ${projectBoardData}`)
    return projectBoardData
  }

  return null
}
