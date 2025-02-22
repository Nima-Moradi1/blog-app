'use client'

import ButtonIcon from "@/_components/_ui/ButtonIcon";
import Modal from "@/_components/_ui/Modal";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useState } from "react";
import ConfirmDeleteModal from "./ConfirmDelete";
import { deletePost } from "@/_lib/actions";
import toast from "react-hot-toast";

const initialState = {
    message : undefined ,
    error: undefined
}

interface PostProps {
    _id: string;
    title: string;
}

export function DeletePost({post}: { post: PostProps }) {
    const { _id : postId, title } = post;
    const [open, setOpen] = useState(false);

    const [state, formAction] = useActionState(async (prevState:any, payload:any) => {      
        const result = await deletePost(prevState, payload);
        if(result.message) {
            toast.success(result.message)
        }else if(result.error) {
            toast.error(result.error)
        }else {
            toast.error('خطای ناشناخته رخ داده است')
        }
      
        return result;
      }, initialState);
    
    return <>
    <ButtonIcon variant="outline"
    onClick={()=> {setOpen(true)}}>
        <TrashIcon stroke="red"/>
    </ButtonIcon>
    <Modal title={`حذف پست "${title}"`} open={open} onClose={()=> setOpen(false)}>
        <ConfirmDeleteModal resourceName={title}  onClose={() => setOpen(false)}
       onConfirm={() => {
        startTransition(() => {
            if (state?.message || state?.error) return; 
            formAction({ postId });
        });
      }}
    />
    </Modal>
    </>
}

export function UpdatePost({id}: {id : string | number}) {
    return <Link href={`/dashboard/posts/${id}/edit`}>
    <ButtonIcon variant="outline">
        <PencilIcon stroke="blue"/>
    </ButtonIcon></Link>
}

export function CreatePost() {
    return <Link href='/dashboard/posts/create'
    className="justify-self-end flex text-white gap-x-4 py-3 items-center rounded-lg bg-primary-900 px-4 text-sm font-thin transition-colors hover:bg-primary-700">
    <span className="hidden md:block">ایجاد پست</span>
    <PlusIcon className="size-5"/>
    </Link>
}

