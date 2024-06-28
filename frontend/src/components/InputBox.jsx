
export const InputBox = ({label, placeholder, onChange}) => {
    return <div> 
        <div className="text-left font-bold text-zinc-600 text-sm py-2 px-0.5">   
            {label}
        </div>
        <div> 
            <input className="w-full border px-2 py-1 border-b-4 rounded border-slate-400" placeholder= {placeholder}  onChange={onChange}/>
        </div>
    </div>
}