import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "@/theme"
import { createContext, useEffect, useState } from "react"
import { pb } from "@/helpers/pocketbase"
import { Admin, Record } from "pocketbase"

export const UserContext = createContext<Record | Admin | null>(null)

function MyApp({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser] = useState(pb.authStore.model)

  useEffect(() => {
    pb.authStore.onChange((auth) => {
      console.log("authStore changed", auth)
      setCurrentUser(pb.authStore.model)
    })
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={currentUser}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </ChakraProvider>
  )
}

export default MyApp
