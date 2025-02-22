'use client'
import { getUserApi, logOutApi, signinApi, signupApi } from "@/_services/userService";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
 // You may wonder why we chose to define signin,signup and ... functions here instead of their own components
 //the reason is, we may call these fetch methods and saving data in state , in multiple routes
 //therefore, we would need to call dispatch(...) everytime in every component and we would HAVE TO 
 //write try and catch and fetch in every component we wanted to call the api.. so, we do it here , 
 //we destructure it so we will ONLY have to do it once and forever!

export interface SigninProps {
    email: string;
    password: string;
}
export interface SignupProps {
    name : string
    email: string;
    password: string;
}

export interface SigninResponseProps {
    user: any;
    message: string;
}
interface StateProps {
    user : {} | null,
    isAuthenticated : boolean,
    isLoading : boolean ,
    isAdmin? : boolean ,
    error : {} | string | null
 }

 const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];

const initialState:StateProps = {
    user : null ,
    isAuthenticated : false ,
    isAdmin : false ,
    isLoading : true ,
    error : null
}

const AuthContext = createContext({})

const authReducer = (state : StateProps, action : { type: string, payload?: any }) => {
    switch (action.type) {
        case 'loading' : 
        return {
                ...state ,
                isloading : true,
            };
        case 'rejected':{
            return {
                ...state,
                isLoading : false ,
                isAdmin : false ,
                error : action.payload , 
            }
            }
        case 'signin':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isAdmin : adminEmails.includes(action.payload?.email) ,
                isLoading: false,
                error: null
            }; 
        case 'signup':
            return {
                ...state ,
                user : action.payload,
                isAdmin : adminEmails.includes(action.payload?.email) ,
                isAuthenticated : true,
                isLoading : false,
                error : null
            };
        case 'user/loaded':
            return {
                ...state,
                user : action.payload,
                isAuthenticated : true,
                isAdmin : adminEmails.includes(action.payload?.email) ,
                isLoading : false
            } ;
            case 'logout' : 
            return {
                state : initialState ,
                user : null ,
                isAuthenticated : false ,
                error : null ,
                isLoading : false ,
                isAdmin : false
            }
        default:
            return state;
    }
}

export default function AuthProvider({children}:{children:React.ReactNode}) {
    const [{user , isAuthenticated , isAdmin, isLoading , error}  , dispatch] = useReducer(authReducer,initialState)
    const router = useRouter()
    const pathname = usePathname()

async function signin(values: SigninProps) {
    dispatch({ type: 'loading' });
    try {
        const { user, message }: SigninResponseProps = await signinApi(values);
        toast.success(message);
        dispatch({ type: 'signin', payload: user });
        router.push(adminEmails.includes(user?.email) ? "/dashboard" : "/");   
     } 
        catch (err: any) {
        const errorMsg = (err as any)?.response?.data?.message 
        dispatch({ type: 'rejected', payload: errorMsg});
        toast.error(errorMsg);
    }
}
async function signup(values:SignupProps){
    dispatch({type : 'loading'})
        try{
            const {user , message} : SigninResponseProps = await signupApi(values)
            dispatch({type : 'signup' , payload : user})
            toast.success(message)
            router.push('/') 
        }catch(err: any){
            const errorMsg = (err as any)?.response?.data?.message
            dispatch({type : 'rejected' , payload : errorMsg})
            toast.error(errorMsg)
        }
}
async function getUser(){
    dispatch({type : 'loading'})
        try{
            const {
                data: { user },
              } = await getUserApi();
            dispatch({type : 'user/loaded' , payload : user})
            if(adminEmails.includes(user?.email)) {
                return isAdmin 
            }
        }catch(err: any){
            const errorMsg = (err as any)?.response?.data?.message
            dispatch({type : 'rejected' , payload : errorMsg})}
}
async function logOut() {
    dispatch({ type: 'loading' });
    try {
        await logOutApi();
        const message = 'از حساب کاربری خارج شدید';
        toast.success(message);
        dispatch({ type: 'logout', payload: message });
        router.push('/signin') 
    } catch (err: any) {
        const errorMsg = 'خطا در خروج از حساب کاربری'
        dispatch({ type: 'rejected', payload: errorMsg});
        toast.error(errorMsg);
    }
}
//Now where do we want to execute this getUser()? >> as soon as user enters website >> so we make a useEffect in this component and as soon as the root layout.tsx renders , this renders too.
useEffect(()=> {
    //since we can't make useEffect async, we call the function inside it and make it async
    async function loadUser(){
        await getUser()
    }
    loadUser()
},[])

useEffect(() => {
    if (pathname.startsWith("/dashboard") && !isAdmin) {
      router.push("/");
    }
  }, [pathname, isAdmin]);


    return <AuthContext.Provider value={{user , isAuthenticated , isAdmin, isLoading , error , signin , signup , logOut}}>
        {children}
    </AuthContext.Provider>
}
// we make a single custom hook to render all the context values in one go
export function useAuth():any {
    const context = useContext(AuthContext)
    //if used where context is not defined or wrapped around
    if(context === undefined) throw new Error('Not Found Auth Context!')
        return useContext(AuthContext);
}