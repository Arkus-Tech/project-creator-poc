"use client"
import { useState } from "react"
import { pb } from "@/lib/network"

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState("")

  async function login(username: string, password: string) {
    setIsLoading(true)
    try {
      await pb.collection("users").authWithPassword(username, password)
      setIsLoading(false)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
        setAuthError(error.message)
      }
      setIsLoading(false)
    }
  }

  async function signUp(username: string, email: string, password: string) {
    const data = {
      email,
      username,
      password,
      passwordConfirm: password,
    }
    try {
      await pb.collection("users").create(data)
      await login(username, password)
      setIsLoading(false)
    } catch (e) {
      console.error(e)
      setIsLoading(false)
    }
  }

  async function logout() {
    await pb.authStore.clear()
  }

  return {
    login,
    signUp,
    logout,
    isLoading,
    authError,
  }
}
