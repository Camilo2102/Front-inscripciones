"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function MainLayout(props: { children: React.ReactNode }){

    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem('userData')
        if(!userData) router.push("/")
    }, [])


    return(
        <div>
            {props.children}
        </div>
    )
}