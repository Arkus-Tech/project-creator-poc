import { trelloWithAuth } from "@/lib/network"

export default async function populateProjectBoard(
  projectBoard: ProjectBoard,
  trelloToken: string
) {
  const trelloAuth = trelloWithAuth(trelloToken)
  // console.log(`Body - project name: ${JSON.stringify(body.projectBoard)}`)
  const encodedBoardName = encodeURIComponent(projectBoard.projectName)
  const response = await trelloAuth(`/boards/?name=${encodedBoardName}`, {
    method: "POST",
  })
  const boardResponseBody: CreateBoardResponse = await response.json()
  const boardId = boardResponseBody.shortUrl.replace(
    "https://trello.com/b/",
    ""
  )
  console.log(`/boards/${boardId}/lists`)
  // const boardName = boardResponseBody.name
  const listRes = await trelloAuth(`/boards/${boardId}/lists`, {})
  console.log(`listResponseBody: ${JSON.stringify(listRes)}`)
  const listResponseBody = await listRes.json()
  const todoListId = listResponseBody[0].id
  console.log(`Todo List ID: ${boardId}`)

  for (const ticket of projectBoard.ticketList) {
    const addTicketsRes = await trelloAuth(
      `/cards?idList=${todoListId}&name=${encodeURIComponent(
        ticket.title
      )}&desc=${encodeURIComponent(ticket.scope)}`,
      {
        method: "POST",
      }
    )
    const addTicketsResponseBody = await addTicketsRes.json()
    const ticketId = addTicketsResponseBody.id
    const checklistRes = await trelloAuth(
      `/cards/${ticketId}/checklists?name=Acceptance%20Criteria`,
      {
        method: "POST",
      }
    )
    const checklistResponseBody = await checklistRes.json()
    const checklistId = checklistResponseBody.id

    for (const criteria of ticket.acceptanceCriteria) {
      const addCriteriaRes = await trelloAuth(
        `/checklists/${checklistId}/checkItems?name=${encodeURIComponent(
          criteria
        )}&pos=bottom`,
        {
          method: "POST",
        }
      )
      const addCriteriaResponseBody = await addCriteriaRes.json()
      console.log(addCriteriaResponseBody)
    }
  }
}
