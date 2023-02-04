import { useForm, SubmitHandler } from "react-hook-form"

import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
  Flex,
  Spinner,
} from "@chakra-ui/react"
import { useAuth } from "@/helpers/pocketbase"
import React from "react"

type Inputs = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export default function LoginForm(props: { onClose: () => void }) {
  const { signUp, isLoading, authError } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    signUp(data.username, data.email, data.password)
      .then((r) => props.onClose())
      .catch((e) => console.log(e))

  console.log(watch("username"))
  console.log(watch("email"))
  console.log(watch("password"))
  console.log(watch("confirmPassword"))

  if (isLoading)
    return (
      <Flex
        justify="center"
        alignItems="center"
        p={4}
        maxW={500}
        bg="gray.700"
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

  return (
    <Box p={4} maxW={500} bg="gray.700" borderRadius={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column">
          <FormControl isInvalid={errors.email !== undefined}>
            <FormLabel htmlFor="email" textAlign="center">
              Email
            </FormLabel>
            <Input
              id="email"
              placeholder="Email"
              type="text"
              {...register("email", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.username !== undefined} mt={8}>
            <FormLabel htmlFor="username" textAlign="center">
              Username
            </FormLabel>
            <Input
              id="username"
              placeholder="Username"
              type="text"
              {...register("username", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password !== undefined} mt={8}>
            <FormLabel htmlFor="password" textAlign="center">
              Password
            </FormLabel>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "This is required",
                minLength: { value: 8, message: "Minimum length should be 8" },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.confirmPassword !== undefined} mt={8}>
            <FormLabel htmlFor="confirm password" textAlign="center">
              Confirm Password
            </FormLabel>
            <Input
              id="confirm-password"
              placeholder="Password"
              type="password"
              {...register("confirmPassword", {
                required: "This is required",
                minLength: { value: 8, message: "Minimum length should be 8" },
                validate: (value) =>
                  value === watch("password") || "Passwords don't match",
              })}
            />
            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={8}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Flex>
      </form>
    </Box>
  )
}
