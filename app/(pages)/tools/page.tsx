import ToolSelector from "@/components/ToolSelector"
import React from "react"

const ProjectManagementSelector = () => {
  const data: Tools[] = [
    {
      id: "1",
      name: "Trello",
      image: "/tool_logos/trello.svg",
    },
    {
      id: "2",
      name: "Jira",
      image: "/tool_logos/jira.svg",
    },
    {
      id: "3",
      name: "Asana",
      image: "/tool_logos/asana.svg",
    },
    {
      id: "4",
      name: "Github",
      image: "/tool_logos/github.svg",
    },
  ]

  return (
    <div className={"flex my-10"}>
      {data.map((tool: Tools) => (
        <ToolSelector key={tool.id} tools={tool} />
      ))}
    </div>
  )
}

export default ProjectManagementSelector
