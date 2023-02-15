declare module "trello"
type TrelloReqBody = {
  boardData: ProjectBoard
  trelloToken: string
}

interface CurrentUser extends Record<any, any> {
  id: string
  username: string
  email: string
  name: string
  avatar: string
  created: string
  updated: string
}

type Tools = {
  id: string
  name: string
  image: string
}
interface ProjectBoard {
  projectName: string
  ticketList: Ticket[]
}

interface Ticket {
  title: string
  scope: string
  acceptanceCriteria: string[]
  helpfulResources: string[]
}

interface CreateBoardResponse {
  id: string
  name: string
  shortUrl: string
}
