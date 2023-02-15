import { openai } from "@/lib/network"

export default async function generateBoard(projectDescription: String) {
  return await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `I want to start a new project. I'm going to make a new Trello board with tasks to complete my project. Generate a name for my project. Take in the description of my project and generate a JSON that matches the following format:\n\ntype Project {\n  projectName: string,\n  ticketList: List of Ticket,\n}\ntype Ticket {\n  title: string,\n  scope: string,\n  acceptance criteria: List of string // one string per criteria\n  helpfulResources: List of string\n}\n\nPlease help me see my project to the finish line! Here's a description of my project:\n\n ${projectDescription}.`,
    temperature: 0.7,
    max_tokens: 3521,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
}
