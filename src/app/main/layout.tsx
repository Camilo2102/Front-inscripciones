"use client"

import { useRouter } from "next/navigation"

export default function MainLayout(props: { children: React.ReactNode }){

    const userData = localStorage.getItem('userData')
    const router = useRouter();
    
    if(!userData) router.push("/")


    return(
        <div>
            {props.children}
        </div>
    )
}