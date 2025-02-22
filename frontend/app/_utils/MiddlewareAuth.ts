export async function middlewareAuth(req: any) {
        //if you have a token in cookies, you can make a request to the server to get it
        const accessToken = req.cookies.get('accessToken');
        const refreshToken = req.cookies.get('refreshToken');
        
        if (accessToken && refreshToken) {
           try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Cookie: `${accessToken.name}=${accessToken.value}; ${refreshToken.name}=${refreshToken.value}`
                }
            });
            const {data : {user}} = await response.json();
            return user
           } catch(error) {
            console.log('failed to fetch user data',error)
            return null;
           }
        } else {
            console.error('Access token or refresh token is missing');
            return null;
        }
    }