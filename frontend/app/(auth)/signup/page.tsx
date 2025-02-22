'use client'

import Button from "@/_components/_ui/Button"
import RHFTextField from "@/_components/_ui/RHFTextField"
import Spinner from "@/_components/_ui/Spinner"
import { useAuth } from "@/_context/AuthContext"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { FieldErrors, FieldValues, Mode, useForm } from "react-hook-form"
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
    name : yup.string().min(5 ,"نام و نام خانوادگی معتبر نیست")
    .max(30 , "بیش از ۳۰ کاراکتر مجاز نمیباشد")
    .required('نام و نام خانوادگی الزامی است') ,
    email : yup.string().email('ایمیل نامعتبر است')
    .required('ایمیل الزامی است') ,
    password : yup.string().required('رمز عبور الزامی است')
    .min(8 , 'رمز عبور باید حداقل ۸ کاراکتر باشد')
    .matches(/(?=.*[0-9])/, {message : 'رمز عبور باید شامل حداقل یک عدد باشد'})
    .matches(/(?=.*[a-z])/, {message : 'رمز عبور باید شامل حداقل یک حرف کوچک باشد'})
    .matches(/(?=.*[A-Z])/, {message : 'رمز عبور باید شامل حداقل یک حرف بزرگ باشد'})
}) .required()

const Signup = () => {

    const {signup} = useAuth()

    const {register , handleSubmit , reset , formState : {errors , isLoading}} = useForm<UseFormProps>({
        /* @ts-ignore */
        resolver : yupResolver(schema) ,
        mode : 'onTouched'
    })
    const onSubmit = async (values:any) => {
      await signup(values)
    }
  return (
    <div>
        <h1 className="font-bold text-xl mb-10">
            ثبت نام
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField 
             label="نام و نام خانوادگی" name="name" register={register} isRequired
             errors={errors}
             />
              <RHFTextField 
             label="ایمیل" name="email" register={register} type="email" dir="ltr" isRequired
             errors={errors}
             />
              <RHFTextField 
             label="رمز عبور" name="password" type="password" register={register} dir="ltr" isRequired
             errors={errors}
             />
            <div className="mt-10">
          {isLoading ? (   
             <Spinner />
          ) : (
            <Button
            disabled={isLoading || Object.keys(errors).length > 0}
              type="submit"
              className="py-3 px-4 btn btn--primary rounded-xl w-full"
            >
              تایید
            </Button>
          )}
        </div>
        </form>
        <Link href="/signin" className="text-secondary-400 mt-6 text-center">
        ورود
      </Link>
    </div>
  )
}

export default Signup


//steps for this page
// 1. handle state
// 2. validate form data
// 3. form submission