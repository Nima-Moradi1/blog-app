'use client'

import ButtonIcon from "@/_components/_ui/ButtonIcon";
import RHFSelect from "@/_components/_ui/RHFSelect";
import RHFTextField from "@/_components/_ui/RHFTextField";
import TextField from "@/_components/_ui/TextField";
import { useCategories } from "@/_hooks/useCategories";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import FileInput from "./FileInput";
import Button from "@/_components/_ui/Button";
import useCreatePost from "@/_hooks/useCreatePost";
import { useRouter } from "next/navigation";
import useEditPost from "@/_hooks/useEditPost";
import { imageUrlToFile } from "@/_utils/FileFormatter";

interface EditProps {
  _id : string
  title : string , 
  text: string , 
  slug : string , 
  briefText: string,
  readingTime : number ,
  category: {
    _id : string
  } ,
  coverImage: File ,
  coverImageUrl: string
}

function CreatePostForm({postToEdit = {}}: {postToEdit? :EditProps | any}) {

  const {_id: editId} = postToEdit
  // We write this because we also use this component in Creating a post, and here we want to make sure we're in edit page
  const isUserEditing = Boolean(editId)
  const {
    title,
    text,
    briefText,
    slug,
    readingTime,
    category,
    coverImage,
    coverImageUrl: prevPostCoverImageUrl,
  } = postToEdit; 
  console.log(postToEdit);
  const {editPost , isEditing} = useEditPost()
  const {createPost , isPending} = useCreatePost()
  //Now,at first, we have an empty object of edits
  let editValues = {}
  if(isUserEditing) {
    editValues = {
      title,
      text,
      briefText,
      slug,
      readingTime,
      category: category._id,
      coverImage,
    };
  }
 
    const router = useRouter()
    const [coverImageUrl , setCoverImageUrl] = useState<string | null>(prevPostCoverImageUrl || null)
   // pass the categories to options in RHFSelect to map on it and show us the results
   const {categories} = useCategories()

   //our schema for validation
    const schema = yup
    .object({
      title: yup
        .string()
        .min(5, "حداقل ۵ کاراکتر را وارد کنید")
        .required("عنوان ضروری است"),
      briefText: yup
        .string()
        .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
        .required("توضیحات ضروری است"),
      text: yup
        .string()
        .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
        .required("توضیحات ضروری است"),
      slug: yup.string().required("اسلاگ ضروری است"),
      readingTime: yup
        .number()
        .positive()
        .integer()
        .required("زمان مطالعه ضروری است")
        .typeError("یک عدد را وارد کنید"),
      category: yup.string().required("دسته بندی ضروری است"),
      coverImage: yup.mixed<File>().required("عکس کاور پست الزامی است"),
    })
    .required();
    
    const { control , setValue ,  register , formState : {errors},handleSubmit , reset} = useForm<{
      title: string;
      briefText: string;
      text: string;
      slug: string;
      readingTime: number;
      category: string;
      coverImage: File;
    }>(
        {
            mode: 'onTouched',
            resolver : yupResolver(schema),
            defaultValues :editValues , 
        }
    )
//For converting url to FILE to send it to the server
    useEffect(() => {
      if(prevPostCoverImageUrl) {
        async function fetchMyApi() {
          const file = await imageUrlToFile(prevPostCoverImageUrl)
          setValue("coverImage", file);
      }
        fetchMyApi()
      }
    },[])

//? Submit the form with Formdata >> WHY we use FormData? because we have a file in the form that's going to be sent with JSON data

    const onSubmit = (data : any) => {
        const formData = new FormData()
            formData.append('title', data.title)
            formData.append('briefText', data.briefText)
            formData.append('text', data.text)
            formData.append('slug', data.slug)
            formData.append('readingTime', data.readingTime)
            formData.append('category', data.category)
            if (data.coverImage instanceof File) {
              formData.append('coverImage', data.coverImage);
            }
            console.log(data);
            //          if(isUserEditing) {
            //   editPost({id: editId , data : formData}, 
            //     {
            //       onSuccess : () => {
            //         router.push('/dashboard/posts')
            //         reset() ;
            //       }
            //     }
            //   )
            // } else {
            //   createPost(formData , {
            //     onSuccess : () => {
            //         router.push('/dashboard/posts')
            //     }
            // })
            // }
            
    }
 
    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField
        label="عنوان"
        name="title"
        register={register}
        isRequired
        errors={errors}
      />
        <RHFTextField
        label="متن کوتاه"
        name="briefText"
        register={register}
        isRequired
        errors={errors}
      />
      <RHFTextField
        label="متن"
        name="text"
        register={register}
        isRequired
        errors={errors}
      />
      <RHFTextField
        label="اسلاگ"
        name="slug"
        register={register}
        isRequired
        errors={errors}
      />
      <RHFTextField
        label="زمان مطالعه"
        name="readingTime"
        register={register}
        isRequired
        errors={errors}
      />
      <RHFSelect
        label="دسته بندی"
        name="category"
        register={register}
        options={categories}
      />
        <Controller
        control={control}
        name="coverImage"
        rules={{ required: "عکس کاور پست الزامی است" }}
        render={({field : {value,onChange , ...rest}}: { field: { value: string | any, onChange: (file: File | null) => void } })=> {
                return <>
                <FileInput id="coverImage" label="انتخاب کاور پست" name="coverImage" 
                isRequired={isEditing}
                errors={errors}
                value={value?.fileName} onChange={(e : any)=> {
                    const file = e?.target.files[0] 
                    onChange(file)
                    setCoverImageUrl(URL.createObjectURL(file))
                }}/>
                </>
            }}/>
            {/* Whenever you use "Fill" for image, give the parent an aspect ratio and relative style */}
            {coverImageUrl && <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image fill src={coverImageUrl} alt="coverImage" className="object-cover object-center"/>
                <ButtonIcon variant="red" className="size-8 absolute left-0"
                onClick={()=> {setCoverImageUrl(null)}}>
                    <XMarkIcon className="size-7"/>
                </ButtonIcon>
            </div>}
            <Button disabled={isPending} variant="primary" type="submit" className="w-full">
                {isPending ? "در حال ارسال..." : "تایید"}
            </Button>
        </form>
    )
}

export default CreatePostForm;