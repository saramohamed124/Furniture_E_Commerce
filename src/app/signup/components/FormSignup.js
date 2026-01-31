'use client'

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { api } from "@/apis/api"
import { SIGNUP } from "@/apis/endpoints"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { EMAIL_REGEX, NAME_REGEX, PWD_REGEX } from "@/app/constant/regex"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"


// Handle Signup Regex validation & Messages
const signupSchema = z.object({
  firstName: z.string().regex(NAME_REGEX, {
    message:'First Name must be 4+ chars at least.'
  }).refine((value) => !value.includes(" "), "Spaces aren't allowed"),
  lastName: z.string().regex(NAME_REGEX, {
    message:'First Name must be 4+ chars at least.'
  }).refine((value) => !value.includes(" "), "Spaces aren't allowed"),
  email: z.string().regex(EMAIL_REGEX, {
    message:"It seems that this email address is invalid. Please try again."
  }).refine((value) => !value.includes(" "), "Spaces aren't allowed"),
  password: z.string().regex(PWD_REGEX, {
    message: "Your password is not strong enough. Please make sure it meets the following criteria:\n • Minimum 8 characters\n • Contains both uppercase and lowercase letters\n • Includes numbers (0-9)\n • Includes at least one special character from: $ ! ? - * # %"
  }).refine((value) => !value.includes(" "), "Spaces aren't allowed"),
  newsletter: z.boolean().default(false),
  confirmPassword: z.string()}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export default function FormSignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  // form State
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      newsletter: false,
    },
  })

  // Handle Submit of SignUp
  const onSubmit = async (values) => {
    setLoading(true)
    setServerError("")
    try {
      const { confirmPassword, ...payload } = values
      const res = await api.post(SIGNUP, {
        first_name: payload.firstName.trim(),
        last_name: payload.lastName.trim(),
        email: payload.email,
        password: payload.password.trim()
      })
      localStorage.setItem("userId", res.data?.data.user.id);
    } catch (err) {
      setServerError(err.response?.data?.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md mx-auto flex flex-col gap-2">
        <h3 className="text-(--main-color) text-3xl font-bold">Create an account</h3>
        {/* Start Form Fields */}
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First Name</FormLabel>
                <FormControl><Input {...field} className="rounded-sm" /></FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last Name</FormLabel>
                <FormControl><Input {...field} className="rounded-sm" /></FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input {...field} type="email" placeholder="example@mail.com" className="rounded-sm" /></FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={'text-(--main-color)'}>Password</FormLabel>
              <FormControl>
                <div className="relative">
                <Input 
                  className={'border-(--border-color-gray) rounded-sm bg-white  focus-visible:shadow-(--main-color)'}
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••" 
                  {...field} 
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                  {showPassword ? ( <EyeOff size={18} className="text-gray-600"/>): (<Eye size={18} className="text-gray-600"/>)
                }
                </button>
                </div>
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl><Input {...field} type="password" placeholder="Enter Your Password Again" className="rounded-sm" /></FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />
        {/* End Form Fields */}
        <FormField
        control={form.control}
        name="newsletter"
        render={({field}) => (
          <div
            className="flex items-start gap-3"
          >
            <Checkbox id="newsletter" checked={field.value} onCheckedChange={field.onChange} className={'border-(--border-color-gray) rounded-sm bg-white  focus-visible:shadow-(--main-color)'}/>
            <div className="grid gap-2">
              <Label htmlFor="newsletter">Newsletter subscription</Label>
              <p className="text-muted-foreground text-sm ">
                    Receive announcements, recommendations, and updates about FurniStyle
              </p>
            </div>
          </div>
        )}
        />
        {serverError && <p className="text-destructive text-sm text-red-500! font-xs">{serverError}</p>}
      <div>
        <Button type="submit" className="w-full md:w-[70%] py-4 px-8 bg-(--main-color-yellow) text-white text-lg hover:bg-(--main-color-dark) rounded-sm">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
        </Button>
        <p className="pt-5 text-base">By signing up, you are agreeing to our <span className="underline">Terms & Conditions</span></p>
      </div>
      <p>You have account already? <Link className="text-(--main-color) underline" href={'/login'}>login</Link></p>
      </form>
    </Form>
  )
}