type TrelloReqBody = {
  boardName: string
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
