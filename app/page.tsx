import React from "react"
import getBoardData from "@/lib/network/getBoardData"
// import NameBoardButton from "@/app/(components)/NameBoardButton"

export default async function Page() {
  const data = await getBoardData()
  console.log("Data: ", data)
  return (
    <>
      <h1>Page</h1>
      <button
        // onClick={async () => {
        //   const data = await getBoardData()
        //   console.log("Data: ", data)
        // }}
        className="btn"
      >
        Click me
      </button>
    </>
  )
}
