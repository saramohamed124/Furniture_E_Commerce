'use server';

import { cookies } from "next/headers";

export const createSessions = async(userData) => {
    try{
    const expireDate  = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    // Handle Cookies Before using to set => await cookies before setting value in nextjs 15+
    const cookiesStore = await cookies();
    // Extract userId from response data
    const userId = userData?.user.id;
    // Ensure user id not found to prevent store empty cookie
    if(!userId) throw new Error("User Id is missing")
    // set Token in cookies in website
    cookiesStore.set('token', userId,{
        expires: expireDate,
        httpOnly:true,
        secure:true,
        sameSite:'lax',
        path:'/',
    });

    }catch(err) {
        throw err; // pass error back to client component
    }
}