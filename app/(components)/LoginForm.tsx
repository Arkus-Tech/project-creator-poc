import { useForm, SubmitHandler } from "react-hook-form"
import { useAuth } from "@/lib/hooks/useAuth"
import React from "react"
import Spinner from "@/components/Spinner"

type Inputs = {
  email: string
  password: string
}

export default function LoginForm(props: { closeModal: () => void }) {
  const { login, isLoading, authError } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    login(data.email, data.password)
      .then((r) => props.closeModal())
      .catch((e) => console.log(e))

  console.log(watch("email"))
  console.log(watch("password"))

  if (isLoading) return <Spinner />

  return (
    <div className={"p-2 max-w-[32 rem]"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"flex flex-col"}>
          <label
            htmlFor="email"
            className={"form-label text-sm font-medium text-slate-700"}
          >
            Email
          </label>
          <input
            id="email"
            placeholder="Email"
            type="text"
            className={
              "mt-1 block bg-white w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 " +
              "focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 " +
              "disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none " +
              "invalid:border-pink-500 invalid:text-pink-600 " +
              "focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            }
            {...register("email", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          {errors.email && (
            <div className={"text-red-500"}>{errors.email.message}</div>
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
          <button className={"mt-2 btn"} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
