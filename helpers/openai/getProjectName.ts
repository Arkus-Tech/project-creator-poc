import { openai } from "@/helpers/openai"

export default async function getProjectName(projectDescription: String) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Give me a name for a ${projectDescription} project.`,
    temperature: 0.7,
    max_tokens: 3521,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  let name = await response.data.choices[0].text

  if (name != undefined) {
    name = name.replaceAll("\n", "")
  }

  console.log(`Result: ${name}`)

  return name
}
