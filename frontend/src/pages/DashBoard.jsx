import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useSearchParams } from 'react-router-dom';
import axios from "axios";

export const DashBoard = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const firstName = searchParams.get("firstName");
    const lastName = searchParams.get("lastName");
    const [balance, setBalance] = useState(0);
    
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then((res) => {
            const ans = Math.round(parseInt(res.data.balance));
            setBalance(ans);
        })
    }, [balance])

    return <div> 
        <Appbar firstName={firstName} lastName={lastName}/> 
        <div className="mx-8 my-10">
            <Balance value={balance}/>
            <Users />
        </div> 
    </div>
}