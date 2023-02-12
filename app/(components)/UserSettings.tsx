"use client"
import React, { Fragment, useState } from "react"
import { Menu, Transition } from "@headlessui/react"
import Image from "next/image"
import useCurrentUser from "@/lib/hooks/useCurrentUser"
import Spinner from "@/components/Spinner"
import { useAuth } from "@/lib/hooks/useAuth"

const UserSettings = () => {
  const { logout } = useAuth()
  const { currentUser } = useCurrentUser()
  const imgSrc = !currentUser?.avatar
    ? `https://robohash.org/${currentUser?.username}.png`
    : `https://pocketcreator.jimmymcbride.dev/api/files/_pb_users_auth_/ooelbyidysr4c9n/${currentUser?.avatar}`
  return (
    <Menu as="div" className="menu h-fill">
      <Menu.Button className="h-fill flex items-center">
        {!currentUser ? (
          <Spinner />
        ) : (
          <Image
            src={imgSrc}
            className="rounded-full"
            width={32}
            height={32}
            alt="avatar"
          />
        )}
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
        <Menu.Items className="menu-items">
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
