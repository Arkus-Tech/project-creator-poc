import { Configuration, OpenAIApi } from "openai"
import PocketBase from "pocketbase"
import { createFetch } from "@/lib/network/helpers"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const trelloApiKey = process.env.TRELLO_API_KEY

export const openai = new OpenAIApi(configuration)

export const pb = new PocketBase("https://pocketcreator.jimmymcbride.dev")

export const trelloWithAuth = (apiToken: string) =>
  createFetch("https://api.trello.com/1", {
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `OAuth oauth_consumer_key="${trelloApiKey}", oauth_token="${apiToken}"`,
    }),
  })
