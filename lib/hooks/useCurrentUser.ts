"use client"
import { useEffect, useState } from "react"
import { pb } from "@/lib/pb"

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState(pb.authStore.model)
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    pb.authStore.onChange((auth) => {
      console.log("authStore changed", auth)
      setCurrentUser(pb.authStore.model)
      if (!auth) {
        setIsAuth(false)
      }
    })
    if (currentUser) {
      setIsAuth(true)
    }
    setIsLoading(false)
  }, [currentUser])

  return { currentUser, isAuth, isLoading }
}
