import React from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={"w-screen flex justify-center"}>
      <div className={"flex-col items-center"}>
        <div>
          <h1 className="text-center text-xl">da Vinci</h1>
          <p className="text-center text-xs font-bold">
            Automate your agile workflows
          </p>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
