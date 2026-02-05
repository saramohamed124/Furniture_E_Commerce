'use client'

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { EMAIL_REGEX, PWD_REGEX } from "@/app/constant/regex"
import { api } from "@/apis/api"
import { LOGIN } from "@/apis/endpoints"
import { Eye, EyeOff, Loader } from "lucide-react"
import { createSessions } from "../../actions/auth"
import { useRouter } from "next/navigation"

const loginSchema = z.object({
  email: z.string().regex(EMAIL_REGEX, {
    message:"It seems that this email address is invalid. Please try again.",
  }).refine((v) => !v.includes(" "), "Spaces aren't allowed."),
  password: z.string().regex(PWD_REGEX, {
    message:"Please Enter A Valid Password",
  }).refine((v) => !v.includes(" "), "Spaces aren't allowed."),
  recaptcha: z.boolean().default(false),
})

export default function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("")
  const router = useRouter()   
  // form state
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      recaptcha: false
    },
  })

  const onSubmit = async(values) => {
    setLoading(true);
    setServerError("");
    try {
      const {email, password} = values
      const res = await api.post(LOGIN, {
        email,
        password,
      });
      await createSessions(res.data);
      router.refresh()
      window.location.pathname = '/';
    } catch (err) {
      setServerError(err.response?.data?.message || "An error occurred")
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md mx-auto  md:flex-1 flex flex-col gap-5">
        <h3 className="text-(--main-color) text-3xl fonst-bold">Sign in to your account</h3>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={'text-(--main-color)'}>Email</FormLabel>
              <FormControl>
                <Input 
                    className={'border-(--border-color-gray) rounded-sm bg-white focus-visible:shadow-(--main-color)'}
                  type="email" 
                  placeholder="example@mail.com" 
                  {...field} 
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className={'flex flex-col gap-4'}>
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
        <FormControl
        control={form.control}
        name="recaptcha"
        render={({field}) => (
            <div className="flex items-start gap-3">
            <Checkbox id="recaptcha" checked={field.value} onCheckedChange={field.onChange} className={'border-(--border-color-gray) rounded-sm bg-white  focus-visible:shadow-(--main-color)'}/>
            <div className="grid gap-2">
              <Label htmlFor="recaptcha">Remember Me</Label>
              <p className="text-muted-foreground text-sm ">
                  This site is protected by reCAPTCHA and the Google Privacy Policy and recaptchaf Service apply.
              </p>
            </div>
          </div>
        )}
        />
        {serverError && <p className="text-destructive text-sm text-red-500! font-xs">{serverError}</p>}
      <div>
        <Button type="submit" className="w-full md:w-[70%] py-4 px-8 bg-(--main-color-yellow) text-white text-lg hover:bg-(--main-color-dark) rounded-sm">
          {loading ? <Loader/> : "Sign in"}
        </Button>
        <p className="underline pt-5 text-base">Forget your password?</p>
      </div>
            <p>Don&apos;t Have Account? <Link className="text-(--main-color) underline" href={'/signup'}>Create new account</Link></p>
      </form>
    </Form>
  )
}