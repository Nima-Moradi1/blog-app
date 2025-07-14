'use client'

import Button from "@/_components/_ui/Button"
import Modal from "@/_components/_ui/Modal"
import RHFTextField from "@/_components/_ui/RHFTextField"
import SpinnerMini from "@/_components/_ui/SpinnerMini"
import { useAuth } from "@/_context/AuthContext"
import useForgotPassword from "@/_hooks/useForgotPassword"
import { yupResolver } from "@hookform/resolvers/yup"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FieldErrors, FieldValues, Mode, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as yup from 'yup'
// export const metadata = {
//     title : 'ثبت نام در سایت'
// }

type UseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
  TTransformedValues extends FieldValues | undefined = undefined,
> = Partial<{
  mode: Mode
  disabled: boolean
  reValidateMode: Exclude<Mode, "onTouched" | "all">
  values: TFieldValues
  errors: FieldErrors<TFieldValues>

}>

const schema = yup.object({
    email : yup.string().email('ایمیل نامعتبر است')
    .required('ایمیل الزامی است') ,
    password : yup.string().required('رمز عبور الزامی است')
  }) .required()

const Signin = () => {

  const { signin } = useAuth()
  const {forgotPasswordFn,isPending} = useForgotPassword();

    const {register , handleSubmit , reset , formState : {errors , isLoading}} = useForm<UseFormProps>({
        /* @ts-ignore */
        resolver : yupResolver(schema) ,
        mode : 'onSubmit'
    })
    const onSubmit = async (values : any) => {
      await signin(values)
    }
    //for modal
    // forgot-password useForm
    const forgotForm = useForm({
  resolver: yupResolver(yup.object({
    email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
  })),
  mode: "onSubmit"
});

    const [isOpen , setIsOpen] = useState<boolean>(false)
    //forgot-password handler
    const forgotPasswordHandler = async (values : any) => {
      forgotPasswordFn(values)
     
      
    }
  return (
   <>
   <div>
        <h1 className="font-bold text-xl mb-10">
            ورود به حساب
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
              <RHFTextField 
             label="ایمیل" name="email" register={register} type="email" dir="ltr" isRequired
             errors={errors}
             />
              <RHFTextField 
             label="رمز عبور" name="password" type="password" register={register} dir="ltr" isRequired
             errors={errors}
             />
            <div className="mt-10">
           {isLoading ? 
           <>
           <SpinnerMini/>
           </> :
              <Button
              disabled={isLoading || Object.keys(errors).length > 0}
                type="submit"
                className="py-3 px-4 btn btn--primary rounded-xl w-full"
              >
             تایید
             </Button>
           }
         
        </div>
        </form>
        <Button
      className="w-full mt-5"
      variant="outline" onClick={()=> setIsOpen(true)}>رمز عبور خود را فراموش کرده ام
      </Button>
        <Link href="/signup" className="text-secondary-400 mt-10 text-center">
        ثبت نام
      </Link>
    </div>
    <Modal title="بازیابی رمز عبور" description="جهت بازیابی رمز عبور ایمیل خود را وارد کنید"
      open={isOpen} onClose={()=> setIsOpen(!isOpen)}>
        <div className="flex items-center justify-center">
          <Image src='/images/forgot-password.jpg' alt="forgot-password-image"
          width={300} height={200} className="rounded-lg mb-5"/>
        </div>
        <form onSubmit={forgotForm.handleSubmit(forgotPasswordHandler)}>
          <RHFTextField 
           label="آدرس ایمیل ثبت نامی" name="email" dir="ltr" isRequired
        register={forgotForm.register} errors={forgotForm.formState.errors}/>
        <Button type="submit" className="w-full mt-10" disabled={isPending}>
            {isPending ? <div className="flex items-center justify-center flex-row-reverse gap-x-5">
           <SpinnerMini className="w-6" />
           <span>لطفا منتظر بمانید</span>
            </div> : 'بازیابی رمز عبور'}
        </Button>
        </form>
    </Modal>
  </>
  )
}

export default Signin


//steps for this page
// 1. handle state
// 2. validate form data
// 3. form submission