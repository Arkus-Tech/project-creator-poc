import React from "react"
import "../styles/globals.css"
import NavBar from "@/components/NavBar"
import AuthModal from "@/app/(components)/AuthModal"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={"min-h-screen min-w-screen flex flex-col items-center"}>
        <NavBar AuthOption={AuthModal} />
        {children}
      </body>
    </html>
  )
}
