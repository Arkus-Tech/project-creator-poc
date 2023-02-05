import { useEffect, useState } from "react"
import { pb } from "@/helpers/pocketbase"

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState(pb.authStore.model)

  useEffect(() => {
    pb.authStore.onChange((auth) => {
      console.log("authStore changed", auth)
      setCurrentUser(pb.authStore.model)
    })
  }, [])

  return currentUser
}
