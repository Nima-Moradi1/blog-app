import Button from "@/_components/_ui/Button"
import SubmitButton from "@/_components/_ui/SubmitButton"
import { TrashIcon } from "@heroicons/react/24/outline"
import { FormEventHandler, MouseEventHandler } from "react"

interface DeleteModalProps {
    resourceName : string , 
    onClose : MouseEventHandler<HTMLButtonElement> ,
    disabled? : boolean , 
    onConfirm : any
}

const ConfirmDeleteModal = ({resourceName , onClose , disabled, onConfirm}:DeleteModalProps) => {
    return (
        <div>
            <h2 className="font-bold text-base mb-9 text-secondary-700"
            >آیا از حذف  &quot; {resourceName} &quot; مطمین هستید؟</h2>
            <form action={onConfirm}>
                <div className="flex justify-between items-center gap-x-16">
                    <Button type="button" className="flex-1" variant="outline" onClick={onClose}>
                        لغو
                    </Button>
                    <SubmitButton type="submit" disabled={disabled} variant='danger' 
                    className="flex gap-x-2 justify-center items-center flex-1">
                        <TrashIcon className="size-5"/>
                        <span>حذف</span>
                    </SubmitButton>
                </div>
            </form>
        </div>
    )
}


export default ConfirmDeleteModal