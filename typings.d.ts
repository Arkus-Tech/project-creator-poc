declare module "trello"
type TrelloReqBody = {
  boardName: string
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
