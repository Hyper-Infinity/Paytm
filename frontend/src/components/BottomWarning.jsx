import { Link } from "react-router-dom"

export const BottomWarning = ({label, buttonText, to}) => {
    return <div className="py-2 flex justify-center text-sm text-slate-700">        
        <div> 
            {label}
        </div>
        <Link className="underline text-sky-500 pl-1 cursor-pointer" to={to}> {buttonText} </Link>
    </div>
}