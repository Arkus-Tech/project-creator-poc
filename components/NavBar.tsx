"use client"
import React from "react"
import Link from "next/link"
import useCurrentUser from "@/app/(components)/useCurrentUser"
import { usePathname } from "next/navigation"
// import { useRouter } from "next/router"

const NavBar = ({ AuthOption }: { AuthOption(): JSX.Element }) => {
  const currentUser = useCurrentUser()
  const route = usePathname()
  // const router = useRouter()
  // router.route
  console.log(`router.route: ${route}`)
  // switch (route) {
  //   case "/":
  // currentUser && router.push("/dashboard")
  // }
  // if (!currentUser) router.push("/")
  return (
    <>
      <nav className={"flex justify-around items-center min-w-screen"}>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/" className={"font-bold text-lg"}>
              AI Project Creator POC
            </Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
        <AuthOption />
      </nav>
    </>
  )
}

export default NavBar
