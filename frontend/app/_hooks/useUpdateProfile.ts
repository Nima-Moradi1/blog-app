import { updateProfileApi } from "@/_services/userService";
import { updateProfileWithRevalidate } from "@/profile/_components/UpdateWithRevalidation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";
import toast from "react-hot-toast";

export default function useUpdateProfile() {

    const queryClient =  useQueryClient()

    const {isPending : isUpdating , mutate : updateProfile} = useMutation({
        mutationFn : updateProfileWithRevalidate ,
        onSuccess : (data : any) => {
            toast.success(data.message) ;
            queryClient.invalidateQueries({
                queryKey: ["user"],
              });
        } ,
        onError : (err : any) => {
            toast.error(err?.response?.data?.message)
        }
    })
    return {isUpdating , updateProfile}
}