import { NextApiRequest, NextApiResponse } from "next"
import * as process from "process"
// import Trello from "trello"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Route request received.")
  // let trello = new Trello(process.env.TRELLO_API_KEY)
  //   trello.makeRequest("get", "/1/authorize/me/boards", { fields: "name" }, function (err, data) {})
  switch (req.method) {
    case "GET":
      console.log("GET request received.")
      res.redirect(
        `https://trello.com/1/authorize?expiration=never&name=Project%20Board%20Generator&scope=read,write&response_type=token&key=${process.env.TRELLO_API_KEY}&callback_method=fragment&return_url=http://localhost:3000`
      )
      // res.status(200).json({ message: "Hello from Trello API" })
      break
    default:
      const error = "Request method not accounted for."
      res.status(500).json({ message: error })
      console.error(error)
      break
  }
}
