import Head from "next/head"
import { useEffect, useState } from "react"
import LoginForm from "@/components/LoginForm"
import RegisterForm from "@/components/RegisterForm"
import {
  Flex,
  Button,
  Tab,
  Tabs,
  TabPanels,
  TabList,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react"
import Layout from "@/components/Layout"

export default function Home() {
  const [data, setData] = useState("")
  const [isLoading, setLoading] = useState(false)

  const createTrelloBoard = (boardName: String) => {
    console.log(`Board Name: ${boardName}`)
    fetch(`/api/trello?boardName=${boardName}`, {
      method: "POST",
      body: JSON.stringify({ boardName }),
    })
      .then((r) => r.json())
      .then((data) => console.log("Data: " + data.json()))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    setLoading(true)
    fetch("/api/openai", {
      method: "POST",
      body: JSON.stringify({ project: "Spotify clone" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`Data: ${data.name}`)
        setData(data.name)
        setLoading(false)
      })
  }, [])

  if (isLoading)
    return (
      <Flex
        justify="center"
        alignItems="center"
        p={4}
        w="100vw"
        h="100vh"
        borderRadius={8}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    )
  if (!data) return <p>No profile data</p>

  return (
    <Layout>
      <Flex
        as="main"
        direction="column"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
      >
        <Button mb={8} onClick={() => createTrelloBoard(data)}>
          {data}
        </Button>
      </Flex>
    </Layout>
  )
}
