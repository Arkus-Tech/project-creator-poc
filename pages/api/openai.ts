import type { NextApiRequest, NextApiResponse } from "next"
const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt:
      "Write an outline for a blog explaining lifetime references in Rust.\n\nI. Introduction\n    A. Definition of lifetime references \n    B. Purpose of lifetime references\nII. Introduction to Lifetimes\n    A. How lifetimes are expressed\n    B. Different lifetime parameters\nIII. Benefits of using Lifetime References \n    A. Increased safety \n    B. Improved readability\nIV. Examples of Lifetime References in Rust \n    A. Function parameter lifetimes \n    B. Struct lifetimes\nV. Challenges of Using Lifetime References \n    A. Difficulty understanding \n    B. Difficulty debugging\nVI. Conclusion \n    A. Summary of lifetime references \n    B. Benefits of using lifetime references",
    temperature: 0.7,
    max_tokens: 3521,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  res.status(200).json(response.data)
}
