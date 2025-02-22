import { middlewareAuth } from "@/_utils/MiddlewareAuth";
import { NextResponse } from "next/server";

interface MiddlewareRequest {
    nextUrl: {
        pathname: string
    }
}

export async function middleware(req: MiddlewareRequest) {
    //e.g:pathname gives us only /profile , not the whole Url , but req.nextUrl does!
    const {pathname} = req.nextUrl;

    if(pathname?.startsWith('/signin') || pathname.startsWith('/signup')) {
        const user = await middlewareAuth(req);
        if (user as any) {
       //since we're using relative redirect, we need to pass the req.nextUrl
               return NextResponse.redirect(new URL('/', req.nextUrl))
        }
       }


    if(pathname?.startsWith('/profile')) {
     const user = await middlewareAuth(req);
     if (user === undefined || user === null) {
    //since we're using relative redirect, we need to pass the req.nextUrl
            return NextResponse.redirect(new URL('/signin', req.nextUrl))
     }
    }
    return NextResponse.next();
    }
    export const config = {
        matcher: ['/profile/:path*' , '/signin' , '/signup']
    }