"use client"
import { useEffect, useState } from "react"
import { pb } from "@/lib/pb"

export default function useCurrentUser() {
  const user = pb.authStore.model
  const [currentUser, setCurrentUser] = useState(user)

  useEffect(() => {
    pb.authStore.onChange((auth) => {
      console.log("authStore changed", auth)
      setCurrentUser(pb.authStore.model)
    })
  }, [])

  return currentUser
}
