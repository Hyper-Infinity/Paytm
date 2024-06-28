import { useState, useSyncExternalStore } from "react"
import { Heading } from "../components/HeadingCompo"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { Button } from "../components/Button"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { BottomWarning } from "../components/BottomWarning"

export const Signin = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-200 flex h-screen justify-center"> 
        <div className="flex flex-col justify-center"> 
            <div className="rounded-lg bg-white w-96 text-center p-2 h-max px-4 shadow-xl"> 
                <Heading  label={"Sign In"}/>
                <SubHeading textInput={"Enter your credentials to access your account."}/>
                <InputBox label={"User Name"} placeholder={"xyz@gmail.com"} onChange={(e) => {
                    setUserName(e.target.value);
                }}/>
                <InputBox label={"Password"} placeholder={"123456"} onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
                <Button label={"Sign In!"} nextLable={"Proceed"} onclick={ async () => {
                    try {
                        const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
                            userName, 
                            password
                        })
                        localStorage.setItem("token", "Bearer " + res.data.token);
                        navigate("/dashboard?id=" + res.data.id + "&firstName=" + res.data.firstName + "&lastName=" + res.data.lastName);
                    }
                    catch(err) {
                        console.log(err.response.data);
                        alert(err.response.data.message);
                    }
                }}/>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}/> 
            </div>
        </div>
    </div>
}