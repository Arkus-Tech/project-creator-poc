"use client"
import React, { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import Image from "next/image"
import useCurrentUser from "@/app/(components)/useCurrentUser"
import Spinner from "@/components/Spinner"
import { useAuth } from "@/helpers/pocketbase"

const UserSettings = () => {
  const { logout } = useAuth()
  const currentUser = useCurrentUser()
  // if (!currentUser) return <Spinner />
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="">
        <Image
          src={`https://pocketcreator.jimmymcbride.dev/api/files/_pb_users_auth_/ooelbyidysr4c9n/${currentUser?.avatar}`}
          className="rounded-full"
          width={32}
          height={32}
          alt="Avatar"
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } block w-full px-4 py-2 text-left text-sm`}
                  onClick={logout}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default UserSettings
