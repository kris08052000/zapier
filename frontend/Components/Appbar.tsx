"use client"

import { useRouter } from "next/navigation"
import { LinkButton } from "./button/LinkButton"
import { PrimaryButton } from "./button/Primarybutton";

export const Appbar = () =>{
    const router = useRouter();
    return <div className="flex border-b justify-between p-4">
        <div className="flex flex-col justify-center text-2xl font-extrabold">
            Zapier
        </div>
        <div className="flex">
            <div className="pr-4">
            <LinkButton onclick={()=>{}}>Contact Sales</LinkButton>
            </div>
            <div className="pr-4">
            <LinkButton onclick={()=>{
                router.push("/login")
            }}>Log in</LinkButton>
            </div>
            <div className="pr-4">
            <PrimaryButton onclick={() => {router.push("/signup")}} size={"small"}>Sign Up</PrimaryButton>
            </div>
        </div>
    </div>
}