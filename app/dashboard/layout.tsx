import React, { Suspense } from "react"
import NavBar from "@/components/NavBar"
import "../../styles/globals.css"
import UserSettings from "@/app/dashboard/(components)/UserSettings"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={"min-h-screen min-w-screen flex flex-col items-center"}>
        <Suspense fallback={<div>Loading...</div>}>
          <NavBar AuthOption={UserSettings} />
          {children}
        </Suspense>
      </body>
    </html>
  )
}
