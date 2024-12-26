import { Link } from "react-router-dom"
export function BottomWarning({label,buttonText,to }){
    return(
        <div className="flex justify-end p-2">
            <div> {label}</div>

            <Link  className= "pl-2 underline" to={to}> {buttonText}</Link>
        </div>
    )
}