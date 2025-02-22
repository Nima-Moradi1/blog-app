'use client'

import { startTransition, useActionState, useState } from "react";
import toast from "react-hot-toast";
import ConfirmDeleteModal from "../../posts/_components/ConfirmDelete";
import Modal from "@/_components/_ui/Modal";
import { TrashIcon } from "@heroicons/react/24/outline";
import ButtonIcon from "@/_components/_ui/ButtonIcon";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";
import { deleteComment } from "@/_lib/actions";

interface CommentProps {
    _id: string;
    content : {
        text : string
    }
}

const initialState = {
    error : undefined ,
    message : undefined
}

export function DeleteCommentBtn({comment}: { comment: CommentProps }) {
    const { _id : commentId, content } = comment;
    const [open, setOpen] = useState(false);
    const [state, formAction] = useActionState(async (prevState:any, payload:any) => {      
        const result = await deleteComment(prevState, payload);
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
    <Modal title={`حذف  "${content.text}"`} open={open} onClose={()=> setOpen(false)}>
        <ConfirmDeleteModal resourceName={content.text}  onClose={() => setOpen(false)}
       onConfirm={() => {
        startTransition(() => {
            if (state?.message || state?.error) return; 
            formAction({ commentId });
        });
      }}
    />
    </Modal>
    </>
}