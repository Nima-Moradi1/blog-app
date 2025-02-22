'use client'

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

//? JUST because we did not want to make root layout and the whole app a client component route, we had to use this provider to wrap the whole app without changing the app structure to client

const queryClient = new QueryClient()
export default function QueryClientProvider({children} : {children : React.ReactNode}) {
    return (
        <ReactQueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
        </ReactQueryClientProvider>
    )
}