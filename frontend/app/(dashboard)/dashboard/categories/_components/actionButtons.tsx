'use client'

import { startTransition, useActionState, useState } from "react";
import toast from "react-hot-toast";
import ConfirmDeleteModal from "../../posts/_components/ConfirmDelete";
import Modal from "@/_components/_ui/Modal";
import { TrashIcon } from "@heroicons/react/24/outline";
import ButtonIcon from "@/_components/_ui/ButtonIcon";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";
import { deleteCategory, deleteComment } from "@/_lib/actions";

interface CategoryProps {
    _id: string;
    title : string
}

const initialState = {
    error : undefined ,
    message : undefined
}

export function DeleteCategoryBtn({category}: { category: CategoryProps }) {
    const { _id : categoryId, title } = category;
    const [open, setOpen] = useState(false);
    const [state, formAction] = useActionState(async (prevState:any, payload:any) => {      
        const result = await deleteCategory(prevState, payload);
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
    <Modal title={`حذف  "${title}"`} open={open} onClose={()=> setOpen(false)}>
        <ConfirmDeleteModal resourceName={title}  onClose={() => setOpen(false)}
       onConfirm={() => {
        startTransition(() => {
            if (state?.message || state?.error) return; 
            formAction({ categoryId });
        });
      }}
    />
    </Modal>
    </>
}