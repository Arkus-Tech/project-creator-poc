"use client"
import React, { Fragment, useState } from "react"
import { Dialog, Tab, Transition } from "@headlessui/react"
import { classNames } from "@/lib/classNames"
import LoginForm from "@/app/(components)/LoginForm"
import RegisterForm from "@/app/(components)/RegisterForm"
import { useModal } from "@/lib/hooks/useModal"

const AuthModal = () => {
  const { isOpen, openModal, closeModal } = useModal()

  const authProps = {
    closeModal,
  }

  return (
    <>
      <div>
        <button onClick={openModal}>Login Or Sign Up!</button>
      </div>
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

AuthModal.propTypes = {
  // currentUser: PropTypes.object,
}

export default AuthModal
