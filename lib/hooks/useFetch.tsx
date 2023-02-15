"use client"
import { useEffect, useState } from "react"

export default function useFetch(url: string, options?: RequestInit) {
  const [data, setData] = useState<Response | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  ;(async function fetchData() {
    setLoading(true)
    try {
      const response = await fetch(url, options)
      setData(response)
    } catch (error) {
      // @ts-ignore
      setError(error.message)
    }
    setLoading(false)
  })()

  return { data, error, loading }
}
