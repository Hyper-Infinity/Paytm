
export const SendButton = ({label, nextLable, onclick}) => {
    return <div className="pt-3">
        <button className="overflow-hidden w-32 p-2 h-12 bg-zinc-600 text-white border-none rounded-md text-lg font-bold cursor-pointer relative z-10 group" onClick={onclick}>
            {label}
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-cyan-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"> </span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-cyan-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"> </span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-cyan-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"> </span>
            <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10"> {nextLable} </span>
        </button>
    </div>
}