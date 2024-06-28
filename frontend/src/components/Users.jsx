import { useEffect, useRef, useState } from "react"
import { InputBox } from "./InputBox"
import axios from "axios";
import { set } from "mongoose";
import { useNavigate } from "react-router-dom";
import { SendButton } from './SendButton';

export const Users = () => {
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([]);
    const setTimeOutId = useRef(0);

    useEffect(() => {
        clearTimeout(setTimeOutId.current);
        setTimeOutId.current = setTimeout(async () => {
            const res = await axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            setUsers(res.data.users);
        }, 1 * 1000);
    }, [filter]);

    return <div className="pt-6"> 
        <div className="font-bold text-lg"> 
            Users
        </div>
        <InputBox placeholder={"Search Users..."} onChange={(e) => {
            setFilter(e.target.value);
        }}/>
        <div> 
            {users.map((user) => {
                return <User key = {user._id} user = {user}/> 
            })}
        </div>
    </div>
}

const User = ({user}) => {
    const navigate = useNavigate();
    return <div className="flex justify-between"> 
        <div className="flex"> 
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-2 mr-2"> 
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0].toUpperCase()}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full"> 
                <div className="text-md font-semibold"> 
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full"> 
            <SendButton label={"Send Money"} nextLable={"Proceed"} onclick={(e) => {
                navigate("/send?id=" + user._id + "&firstName=" + user.firstName + "&lastName=" + user.lastName);
            }}/>
        </div>
    </div>
}