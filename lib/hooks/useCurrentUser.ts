"use client"
import { useEffect, useState } from "react"
import { pb } from "@/lib/network"

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState(pb.authStore.model)
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    pb.authStore.onChange((auth) => {
      setCurrentUser(pb.authStore.model)

      // if (currentUser && currentUser?.id !== null) {
      //   saveSession(currentUser.id, auth)
      // }

      if (!auth) {
        setIsAuth(false)
      }
    })

    if (currentUser) setIsAuth(true)
    else setIsAuth(false)

    setIsLoading(false)
  }, [currentUser])

  // function saveSession(userId: string, token: string) {
  //   console.log("current user id:", userId)
  //   console.log("current token:", token)
  //   // save user id and token to redis
  // }

  return { currentUser, isAuth, isLoading }
}
