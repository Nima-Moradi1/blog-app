"use server";

import { updateProfileApi } from "@/_services/userService";
import setCookieOnReq from "@/_utils/SetCookieOnReq";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateProfileWithRevalidate(data: any) {
    const cookieStore = await cookies()
    const options = setCookieOnReq(cookieStore)
    const response = await updateProfileApi(data, options);
    revalidatePath("/profile");
    return response; 
}