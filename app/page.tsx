"use client"
import React, { useEffect, useState } from "react"
import NameBoardButton from "@/app/(components)/NameBoardButton"

export default function Page() {
  const [data, setData] = useState("")
  const [isLoading, setLoading] = useState(false)

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

  useEffect(() => {
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
        // return data
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <NameBoardButton data={data} createTrelloBoard={createTrelloBoard} />
    </>
  )
}
