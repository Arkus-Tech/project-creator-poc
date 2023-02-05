"use client"
import React, { Suspense, useEffect, useState } from "react"

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
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [])
  return (
    <div className={"flex flex-col justify-center items-center"}>
      <button className={"mt-4 btn"} onClick={() => createTrelloBoard(data)}>
        <Suspense
          fallback={
            <div className="flex justify-center items-center">
              <div
                className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          {data}
        </Suspense>
      </button>
    </div>
  )
}

export default NameBoardButton
