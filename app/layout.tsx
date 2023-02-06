import React from "react"
import "../styles/globals.css"
import NavBar from "@/app/(components)/NavBar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log()
  return (
    <html lang="en">
      <body className={"min-h-screen min-w-screen flex flex-col items-center"}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
