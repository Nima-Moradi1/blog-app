'use client'

import FileInput from "@/(dashboard)/dashboard/posts/create/_components/FileInput"
import ButtonIcon from "@/_components/_ui/ButtonIcon"
import SpinnerMini from "@/_components/_ui/SpinnerMini"
import SubmitButton from "@/_components/_ui/SubmitButton"
import useUploadAvatar from "@/_hooks/useUploadAvatar"
import { XMarkIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

const UploadAvatar = () => {
    const [avatar , setAvatar] = useState<string | null>(null)
    const {control, formState : {errors} , handleSubmit} = useForm({})
    const {isUploading ,uploadAvatar} = useUploadAvatar()
    const onSubmit = (avatar : any) => {
       try {
        if(avatar.avatar instanceof File) {
            const formData = new FormData()
            formData.append("avatar" , avatar.avatar)
            uploadAvatar(formData)
            console.log("logging the avatar",avatar.avatar);
        }
       }catch(err) {
        console.log("error uploading avatar : " , err);
       }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
        control={control}
        name="avatar"
        render={({field : {value,onChange , ...rest}}: { field: { value: string | any, onChange: (file: File | null) => void } })=> {
                return <>
                <FileInput
                disabled={isUploading}
                className="mt-20"
                 id="avatar" label="انتخاب تصویر پروفایل" name="avatar" 
                errors={errors}
                value={value?.fileName} onChange={(e : any)=> {
                    const file = e?.target.files[0] 
                    onChange(file)
                    setAvatar(URL.createObjectURL(file))
                }}/>
                </>
            }}/>
            {/* Whenever you use "Fill" for image, give the parent an aspect ratio and relative style */}
            {avatar && 
            <>
            <div className="relative aspect-video rounded-lg overflow-hidden my-5">
                <Image fill src={avatar} alt="avatar" className="object-cover object-center"/>
                <ButtonIcon variant="red" className="size-8 absolute left-0"
                onClick={()=> {setAvatar(null)}}>
                    <XMarkIcon className="size-7"/>
                </ButtonIcon>
            </div>
            <SubmitButton disabled={isUploading} className="w-full"
            >{isUploading ? <SpinnerMini /> : 'تایید'}</SubmitButton>
            </>
            }
        </form>
    )
}

export default UploadAvatar