import React from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={"w-screen flex justify-center"}>
      <div className={"flex-col items-center"}>
        <div>About Us</div>
        <div>{children}</div>
      </div>
    </div>
  )
}
