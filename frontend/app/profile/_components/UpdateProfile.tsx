'use client'

import RHFTextField from "@/_components/_ui/RHFTextField"
import SpinnerMini from "@/_components/_ui/SpinnerMini"
import SubmitButton from "@/_components/_ui/SubmitButton"
import useUpdateProfile from "@/_hooks/useUpdateProfile"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as yup from 'yup'



const UpdateProfile = ({user : {name , email}} : {user : {name:string ,email : string}}) => {

    let updateValues = {
        name ,
        email
    }
    const router = useRouter()
    const {isUpdating , updateProfile} = useUpdateProfile()

    const schema = yup.object({
        name : yup.string().required('وارد کردن نام اجباری است').min(7 , 'نام کامل میبایستی حداقل ۷ کاراکتر باشد').max(40, 'نام نمیتواند بالای ۴۰ کاراکتر باشد') ,
        email : yup.string().email('ایمیل معتبر وارد کنید').required('وارد کردن ایمیل اجباری است')
    })
    .required()

    const {register , formState : {errors}, handleSubmit , reset} = useForm({
        mode : 'onTouched' ,
        resolver : yupResolver(schema) , 
        defaultValues : updateValues
    })

    const onSubmit = async (data : any) => {
       updateProfile(data , {
        onSuccess : () => {
            reset()
            router.refresh()
            window.location.href = '/profile'
        }
       })
    }

    return (
        <div className="max-w-lg mx-auto mt-10 xl:border-r xl:border-r-secondary-200 pr-10">
            <h2 className="text-xl text-center font-bold text-secondary-500 mb-10"
            >آپدیت اطلاعات پروفایل</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField errors={errors} isRequired  label="نام کامل"   name="name"  register={register}/>
            <RHFTextField errors={errors} isRequired  label="ایمیل" name="email" register={register}/>
        <SubmitButton disabled={isUpdating} variant="outline" className="w-full mt-10 flex items-center justify-center">
            {isUpdating ? <SpinnerMini /> : "تایید"}
        </SubmitButton>
        </form>
        </div>
    )
}


export default UpdateProfile