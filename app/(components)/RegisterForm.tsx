import { useForm, SubmitHandler } from "react-hook-form"
import { useAuth } from "@/helpers/pocketbase"
import React from "react"
import Spinner from "@/components/Spinner"

type Inputs = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export default function LoginForm(props: { closeModal: () => void }) {
  const { signUp, isLoading, authError } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    signUp(data.username, data.email, data.password)
      .then((r) => props.closeModal())
      .catch((e) => console.log(e))

  console.log(watch("username"))
  console.log(watch("email"))
  console.log(watch("password"))
  console.log(watch("confirmPassword"))

  if (isLoading) return <Spinner />

  return (
    <div className={"p-1 max-w-[500px] rounded-md"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"flex flex-col"}>
          <label htmlFor="email" className={"text-center"}>
            Email
          </label>
          <input
            id="email"
            placeholder="Email"
            type="text"
            {...register("email", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          {errors.email && (
            <div className={"text-red-500"}>{errors.email.message}</div>
          )}

          <label htmlFor="username" className={"text-center mt-2"}>
            Username
          </label>
          <input
            id="username"
            placeholder="Username"
            type="text"
            {...register("username", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          {errors.username && (
            <div className={"text-red-500"}>{errors.username.message}</div>
          )}

          <label htmlFor="password" className={"text-center mt-2"}>
            Password
          </label>
          <input
            id="password"
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "This is required",
              minLength: { value: 8, message: "Minimum length should be 8" },
            })}
          />
          {errors.password && (
            <div className={"text-red-500"}>{errors.password.message}</div>
          )}

          <label htmlFor="confirm password" className={"text-center mt-2"}>
            Confirm Password
          </label>
          <input
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
          {errors.confirmPassword && (
            <div className={"text-red-500"}>
              {errors.confirmPassword.message}
            </div>
          )}

          <button className={"mt-2 btn"} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
