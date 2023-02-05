"use client"
import React, { Fragment, useState } from "react"
import Link from "next/link"
import LoginForm from "@/app/(components)/LoginForm"
import RegisterForm from "@/app/(components)/RegisterForm"
import { useAuth } from "@/helpers/pocketbase"
import useCurrentUser from "@/app/(components)/useCurrentUser"
import { Menu, Transition, Dialog, Tab } from "@headlessui/react"
import Image from "next/image"
import { classNames } from "@/lib/classNames"

const NavBar = () => {
  const currentUser = useCurrentUser()
  const { logout } = useAuth()
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const authProps = {
    closeModal,
  }
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
            <Link href="/about">About</Link>
          </li>
        </ul>
        {currentUser ? (
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
        ) : (
          <div>
            <button onClick={openModal}>Login Or Sign Up!</button>
          </div>
        )}
      </nav>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Tab.Group>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                        <Tab
                          key={"login"}
                          className={({ selected }) =>
                            classNames(
                              "w-full rounded-md py-2.5 text-sm font-medium leading-5 text-blue-700",
                              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                              selected
                                ? "bg-white shadow"
                                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                            )
                          }
                        >
                          Login
                        </Tab>
                        <Tab
                          key={"signup"}
                          className={({ selected }) =>
                            classNames(
                              "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                              selected
                                ? "bg-white shadow"
                                : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                            )
                          }
                        >
                          Sign Up
                        </Tab>
                      </Tab.List>
                    </Dialog.Title>
                    <Tab.Panels className={"mt-2"}>
                      <Tab.Panel>
                        <LoginForm {...authProps} />
                      </Tab.Panel>
                      <Tab.Panel>
                        <RegisterForm {...authProps} />
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>

                  {/*<div className="mt-4">*/}
                  {/*  <button*/}
                  {/*    type="button"*/}
                  {/*    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"*/}
                  {/*    onClick={closeModal}*/}
                  {/*  >*/}
                  {/*    Got it, thanks!*/}
                  {/*  </button>*/}
                  {/*</div>*/}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/*<Modal isOpen={isOpen} onClose={closeModal} isCentered>*/}
      {/*  <ModalOverlay />*/}
      {/*  <ModalContent>*/}
      {/*    <ModalHeader textAlign="center">Welcome!</ModalHeader>*/}
      {/*    <ModalCloseButton />*/}
      {/*    <ModalBody>*/}
      {/*      <Tabs isFitted>*/}
      {/*        <TabList>*/}
      {/*          <Tab>Login</Tab>*/}
      {/*          <Tab>Sign Up</Tab>*/}
      {/*        </TabList>*/}

      {/*        <TabPanels>*/}
      {/*          <TabPanel>*/}
      {/*            <LoginForm {...authProps} />*/}
      {/*          </TabPanel>*/}
      {/*          <TabPanel>*/}
      {/*            <RegisterForm {...authProps} />*/}
      {/*          </TabPanel>*/}
      {/*        </TabPanels>*/}
      {/*      </Tabs>*/}
      {/*    </ModalBody>*/}
      {/*  </ModalContent>*/}
      {/*</Modal>*/}
    </>
  )
}

export default NavBar
