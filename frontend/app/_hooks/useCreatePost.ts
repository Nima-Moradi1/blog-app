import { createPostApi } from "@/_services/postServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useCreatePost() {
    const queryClient = useQueryClient()
    //? We use useMutation when we want to put or post something (mutating it) but for GET reqs, we use useQuery()
    const {isPending , mutate : createPost} = useMutation({
        mutationFn:createPostApi, 
        onSuccess : (data) => {
            toast.success(data.message)
    //? Basically,everywhere in the app where we fetched posts with this query key, gets invalited and refetched automatically
            queryClient.invalidateQueries({
                queryKey : ['posts']
            })
            
        }, 
        onError : (error : any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "خطایی رخ داده است")
    }
    })
    return {createPost , isPending}
}