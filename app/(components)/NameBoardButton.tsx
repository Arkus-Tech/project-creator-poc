"use client"
import React, { useEffect, useState } from "react"
import Spinner from "@/components/Spinner"
import Link from "next/link"
import { Configuration, OpenAIApi } from "openai"

const createTrelloBoard = (boardData: ProjectBoard, trelloToken: string) => {
  console.log(`Board Data: ${JSON.stringify(boardData)}`)
  fetch(`/api/trello/create-board`, {
    method: "POST",
    body: JSON.stringify({ boardData, trelloToken }),
  })
    .then((r) => r.json())
    .then((data) => console.log("Data: " + data.json()))
    .catch((error) => console.error(error))
}

const NameBoardButton = () => {
  const [data, setData] = useState<ProjectBoard | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [trelloToken, setTrelloToken] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    const params = new URLSearchParams(hash.substring(1))
    const token = params.get("token")

    console.log(`Token: ${token}`)

    if (token) {
      console.log(`Set Token: ${token}`)
      localStorage.setItem("trelloToken", token)
    }

    const localToken = localStorage.getItem("trelloToken")
    if (localToken) {
      setTrelloToken(localToken)
    }
  }, [])

  const getBoardName = () => {
    const defaultProjectDescription =
      "I want to build a todo app. I want to use Jetpack Compose, Room, and Dagger Hilt. I want my app to be a single user app, no authentication. I want user's to be able to view todo list, and filter list by the fields for priority and tags. Tags is a list of string, and users should be able to select multiple tags when filtering todos. The user should be able to mark todo's complete from the list, and be able to batch delete completed todo's. They should also be able to delete any completed todo's by swiping right on that todo as well. It should only be one screen, and adding and editing todo's should happen inside alert dialog modals.\\n\\n\\n"
    setLoading(true)
    fetch("/api/ai/generate-project-board", {
      method: "POST",
      body: JSON.stringify({
        projectDescription: defaultProjectDescription,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const parsedData = JSON.parse(data)
        console.log(`Project Name: ${JSON.stringify(parsedData)}`)
        setData(parsedData)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }

  return (
    <div className={"flex flex-col justify-center items-center"}>
      <button className={"mt-4 btn"} onClick={() => getBoardName()}>
        Generate Project Name
      </button>
      <div className={"mt-4 text-lg font-bold text-slate-700"}>
        {isLoading ? (
          <Spinner />
        ) : !isLoading && data === null ? (
          ""
        ) : (
          <div>
            <h3 className={"text-lg font-bold"}>{data?.projectName}</h3>
            {data?.ticketList.map((ticket) => (
              <div key={ticket.title}>
                <h4 className={"font-bold"}>{ticket.title}</h4>
                <p>{ticket.scope}</p>
                <p className={"font-bold"}>Acceptance Criteria</p>
                {ticket.acceptanceCriteria.map((criteria) => (
                  <p key={criteria}>{criteria}</p>
                ))}
                <p className={"font-bold"}>Helpful Resources</p>
                {ticket.helpfulResources.map((resource) => (
                  <p key={resource}>{resource}</p>
                ))}
              </div>
            ))}
            <button
              className={"btn mt-4 bg-red-700"}
              onClick={() => {
                if (data !== null) {
                  createTrelloBoard(data, trelloToken)
                }
              }}
            >
              Generate Board
            </button>
          </div>
        )}
      </div>
      <Link
        href={`https://trello.com/1/authorize?expiration=never&name=Project%20Board%20Generator&scope=read,write&response_type=token&key=${process.env.TRELLO_API_KEY}&callback_method=fragment&return_url=http://localhost:3000`}
        className={"mt-4 btn"}
      >
        Link Trello Account
      </Link>
    </div>
  )
}

export default NameBoardButton
