import { uploadAvatarApi } from "@/_services/userService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"


const useUploadAvatar =  () => {
    const queryClient = useQueryClient()
    const {isPending : isUploading , mutate : uploadAvatar} = useMutation({
        mutationFn : uploadAvatarApi,
        onSuccess : (data : any) => {
            toast.success(data.message)
            queryClient.invalidateQueries(
                {
                    queryKey : ['posts' , 'user']
                }
            )
        } , 
        onError : (err : any) => {
            toast.error(err?.response?.data?.message)
            console.log(err?.response?.data?.message);
        }
    })
    return {
        isUploading , uploadAvatar
    }
}

export default useUploadAvatar