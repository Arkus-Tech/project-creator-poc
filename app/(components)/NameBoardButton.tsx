"use client"
import React, { useState } from "react"
import Spinner from "@/components/Spinner"

const createTrelloBoard = (boardName: String) => {
  console.log(`Board Name: ${boardName}`)
  fetch(`/api/trello?boardName=${boardName}`, {
    method: "POST",
    body: JSON.stringify({ boardName }),
  })
    .then((r) => r.json())
    .then((data) => console.log("Data: " + data.json()))
    .catch((error) => console.error(error))
}

const NameBoardButton = () => {
  const [data, setData] = useState("")
  const [isLoading, setLoading] = useState(false)

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

  return (
    <div className={"flex flex-col justify-center items-center"}>
      <button className={"mt-4 btn"} onClick={() => getBoardName()}>
        Generate Project Name
      </button>
      <div className={"mt-4 text-lg font-bold text-slate-700"}>
        {isLoading ? <Spinner /> : !isLoading && data === "" ? "" : data}
      </div>
    </div>
  )
}

export default NameBoardButton
