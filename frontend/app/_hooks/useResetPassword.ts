import { createPostApi } from "@/_services/postServices";
import { forgotPasswordApi, resetPasswordApi } from "@/_services/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useResetPassword() {
    //? We use useMutation when we want to put or post something (mutating it) but for GET reqs, we use useQuery()
    const {isPending , mutate : resetPasswordFn} = useMutation({
        mutationFn:resetPasswordApi, 
        onSuccess : (data) => {
            toast.success(data.message)
        }, 
        onError : (error : any) => {
            console.log(error);
            toast.error(error?.response?.data?.message || "خطایی رخ داده است")
    }
    })
    return {resetPasswordFn , isPending}
}