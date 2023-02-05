import React, { Suspense } from "react"
import NameBoardButton from "@/app/(components)/NameBoardButton"
import NavBar from "@/components/NavBar"

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {/*<NavBar />*/}
        <NameBoardButton />
      </Suspense>
    </>
  )
}
