"use client"
import React from "react"

type PageProps = {
  tools: Tools
}

const handleButtonClick = (toolId: string) => {
  console.log(`Button clicked for tool ${toolId}`)
}

const ToolSelector = ({ tools: { id, name, image } }: PageProps) => {
  return (
    <div className="flex flex-col items-center justify-center mx-2">
      <img src={image} alt={"logo"} className={"h-10 w-15"} />
      <p className="text-sm font-bold mt-2">{name}</p>
      <button
        onClick={() => handleButtonClick(id)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        Select
      </button>
    </div>
  )
}

export default ToolSelector
