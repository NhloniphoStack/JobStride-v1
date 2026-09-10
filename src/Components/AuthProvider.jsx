import { createContext } from "react";
import { Outlet, redirect, useLoaderData } from "react-router";
import { getUser } from "../api/getUser.js";

export const userContext = createContext()

export async function authLoader(){
    try{

        const userData = await getUser()

      

      if(userData.message === 'Unauthorized user!'){

        return redirect('/?message=Please login first!')
      }

        return userData

    }catch(err){
        return err
    }


}

export function AuthProvider(){
    const user = useLoaderData()
    
    return (
        <userContext.Provider value={{user}}>
           <Outlet />
        </userContext.Provider>
    )
}