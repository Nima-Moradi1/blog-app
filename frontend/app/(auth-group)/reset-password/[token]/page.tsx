'use client'
import Button from '@/_components/_ui/Button';
import RHFTextField from '@/_components/_ui/RHFTextField';
import SpinnerMini from '@/_components/_ui/SpinnerMini';
import useResetPassword from '@/_hooks/useResetPassword';
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type TokenParamsPromise = Promise<{
  token: string
}>
const schema = yup.object({
    password : yup.string().required('رمز عبور الزامی است')
    .min(8 , 'رمز عبور باید حداقل ۸ کاراکتر باشد')
    .matches(/(?=.*[0-9])/, {message : 'رمز عبور باید شامل حداقل یک عدد باشد'})
    .matches(/(?=.*[a-z])/, {message : 'رمز عبور باید شامل حداقل یک حرف کوچک باشد'})
    .matches(/(?=.*[A-Z])/, {message : 'رمز عبور باید شامل حداقل یک حرف بزرگ باشد'}) , 
    confirmPassword : yup.string().oneOf([yup.ref('password')], 'رمز عبور و تکرار آن باید یکسان باشند')
}) .required()

const ResetPasswordPage = ({params}:{params : TokenParamsPromise}) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  async function getToken(){
    const token = (await params)?.token;
    return token;
  }

  const {formState : {errors} , register , handleSubmit} = useForm({
    mode : 'onBlur',
    resolver : yupResolver(schema)
  })
  const {isPending,resetPasswordFn} = useResetPassword()
  const formHandler = async (data: any) => {
    try {
      const password = data.password;
     const token = await getToken();
     resetPasswordFn({token , password} , {
      onSuccess : () => {
          router.push('/signin')
      }
     })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <div className='w-full mx-auto flex flex-col items-center justify-start lg:justify-evenly min-h-screen lg:-mt-32 lg:flex-row-reverse'>
      <div className='w-full lg:max-w-md mx-auto flex justify-center'>
        <Image src='/images/reset-password.png' alt='reset-logo'
        width={300} height={300} className='mb-10 lg:mb-0'
        />
      </div>
      <div className='mx-auto container lg:max-w-md'>
        <h3 className='font-bold lg:text-2xl text-xl mb-5'
        >تعیین رمز عبور جدید</h3>
        <div>
          <form onSubmit={handleSubmit(formHandler)}>
            <div className='relative'>
            <RHFTextField type={showPassword ? 'text' : 'password'} name='password' label='رمز عبور جدید' register={register} errors={errors}/>
              {showPassword ? <>
                            <EyeIcon
                              onClick={()=> setShowPassword(!showPassword)}
                              className={`${Object.keys(errors).includes('password') && Object.keys(errors).length > 0 ? 'top-1/2' : 'top-2/3'} absolute cursor-pointer left-3  -translate-y-1/2 size-5 text-gray-500`}/>
              </> : <>
                            <EyeSlashIcon
                            onClick={()=> setShowPassword(!showPassword)}
                              className={`${Object.keys(errors).includes('password') && Object.keys(errors).length > 0 ? 'top-1/2' : 'top-2/3'} absolute cursor-pointer left-3  -translate-y-1/2 size-5 text-gray-500`}/>
              </>}
            </div>
            <div className='relative'>
            <RHFTextField type={showPassword ? 'text' : 'password'} name='confirmPassword' label='تکرار رمز عبور' register={register} errors={errors}/>
            {showPassword ? <>
                        <EyeIcon
                              onClick={()=> setShowPassword(!showPassword)}
                              className={`${Object.keys(errors).includes('confirmPassword') && Object.keys(errors).length > 0 ? 'top-1/2' : 'top-2/3'} absolute cursor-pointer left-3  -translate-y-1/2 size-5 text-gray-500`}/>
              </> : <>
                            <EyeSlashIcon
                            onClick={()=> setShowPassword(!showPassword)}
                              className={`${Object.keys(errors).includes('confirmPassword') && Object.keys(errors).length > 0 ? 'top-1/2' : 'top-2/3'} absolute cursor-pointer left-3  -translate-y-1/2 size-5 text-gray-500`}/>
              </>}
            </div>
            <Button disabled={isPending} type='submit'
             className='mt-10 w-full flex flex-row-reverse items-center justify-center gap-x-5'>
              {isPending ? <>
              <SpinnerMini className='size-5'/>
              <span>در حال تغییر رمز</span>
              </> : "ثبت رمز عبور جدید"}
            </Button>
          </form>
        </div>
            <div className='flex *:cursor-pointer items-center justify-between mt-10'>
      <Link href='/signin' className='flex gap-x-1 items-center hover:underline'>
      بازگشت به صفحه ورود
      <ArrowLeftIcon className='size-5'/>
      </Link>
      <Link href='/' className='flex gap-x-1 items-center hover:underline '>
      رفتن به صفحه اصلی
      <ArrowLeftIcon className='size-5'/>
      </Link>
    </div>
      </div>
    </div>
    </>
  )
}

export default ResetPasswordPage