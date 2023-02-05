import React from "react"
import NavBar from "@/app/(components)/NavBar"
import "../styles/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={"min-h-screen min-w-screen flex flex-col items-center"}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
