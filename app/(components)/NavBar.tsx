"use client"
import React from "react"
import Link from "next/link"
import useCurrentUser from "@/lib/hooks/useCurrentUser"
import UserSettings from "@/app/(components)/UserSettings"
import AuthModal from "@/app/(components)/AuthModal"
import Spinner from "@/components/Spinner"

const NavBar = () => {
  const { isAuth, isLoading } = useCurrentUser()
  return (
    <>
      <nav className={"flex justify-around h-12 items-center min-w-screen"}>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/" className={"font-bold text-lg"}>
              AI Project Creator POC
            </Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
        {isLoading ? <Spinner /> : isAuth ? <UserSettings /> : <AuthModal />}
      </nav>
    </>
  )
}

export default NavBar
