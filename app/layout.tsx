import React from "react"
import "../styles/globals.css"
import NavBar from "@/app/(components)/NavBar"
import { pb, trelloWithAuth } from "@/lib/network"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const trelloAuthApi = trelloWithAuth("token")
  const res = await trelloAuthApi("/members/me", { method: "GET" })
  pb.authStore.model

  return (
    <html lang="en">
      <body className={"min-h-screen min-w-screen flex flex-col items-center"}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
