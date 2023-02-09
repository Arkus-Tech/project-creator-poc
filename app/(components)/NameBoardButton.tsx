"use client"
import React, { useEffect, useState } from "react"
import Spinner from "@/components/Spinner"
import Link from "next/link"
// import { useRouter } from "next/router"

const createTrelloBoard = (boardName: string, trelloToken: string) => {
  console.log(`Board Name: ${boardName}`)
  fetch(`/api/trello/create-board`, {
    method: "POST",
    body: JSON.stringify({ boardName, trelloToken }),
  })
    .then((r) => r.json())
    .then((data) => console.log("Data: " + data.json()))
    .catch((error) => console.error(error))
}

const NameBoardButton = () => {
  const [data, setData] = useState("")
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
    setLoading(true)
    fetch("/api/openai", {
      method: "POST",
      body: JSON.stringify({ project: "Spotify clone" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`Data Name: ${data.name}`)
        setData(data.name)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }

  const trelloAuth = () => {
    console.log("Fetching Trello Auth")
  }

  return (
    <div className={"flex flex-col justify-center items-center"}>
      <button className={"mt-4 btn"} onClick={() => getBoardName()}>
        Generate Project Name
      </button>
      <div className={"mt-4 text-lg font-bold text-slate-700"}>
        {isLoading ? (
          <Spinner />
        ) : !isLoading && data === "" ? (
          ""
        ) : (
          <div>
            <p>{data}</p>
            <button
              className={"btn mt-4 bg-red-700"}
              onClick={() => createTrelloBoard(data, trelloToken)}
            >
              Generate Board
            </button>
          </div>
        )}
      </div>
      <Link
        href={`https://trello.com/1/authorize?expiration=never&name=Project%20Board%20Generator&scope=read,write&response_type=token&key=${process.env.TRELLO_API_KEY}&callback_method=fragment&return_url=http://localhost:3000`}
        className={"mt-4 btn"}
        onClick={() => trelloAuth()}
      >
        Link Trello Account
      </Link>
    </div>
  )
}

export default NameBoardButton
