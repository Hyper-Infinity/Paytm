import {Link} from "react-router-dom"

export const Appbar = ({firstName, lastName}) => {
    return <div> 
        <nav className="border-gray-200 bg-slate-400">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 shadow-[10px_35px_60px_-15px_rgba(0,0,0,0.35)]">
                <Link to={'/dashboard'} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://cdn-icons-png.flaticon.com/128/3268/3268208.png" className="h-9" alt="Paytm Logo" />
                    <div className="flex flex-col justify-center pb-1">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-950">Paytm</span>
                    </div>
                </Link>
                <div className="self-center text-md font-semibold dark:text-gray-100 text-opacity-50">
                    {firstName.toUpperCase() + " " + lastName.toUpperCase()}
                </div>
            </div>
        </nav>
    </div>
}