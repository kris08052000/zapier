import type { ReactNode } from "react";

export const PrimaryButton = ({children, onclick, size = "small"} : {
    children : ReactNode,
    onclick: () => void,
    size?: "big" |"small"}
) => {
    return <div className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 py-2" : "px-10 py-4"} cursor-pointer hover:shadow-md bg-amber-700 text-white rounded-full text-center flex justify-center flex-col`} onClick={onclick}>  
    {children}
    </div>
}