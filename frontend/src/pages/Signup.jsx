import { useState, useSyncExternalStore } from "react"
import { Heading } from "../components/HeadingCompo"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { Button } from "../components/Button"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { BottomWarning } from "../components/BottomWarning"

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 flex h-screen justify-center"> 
        <div className="flex flex-col justify-center"> 
            <div className="rounded-lg bg-white w-96 text-center p-2 h-max px-4 shadow-xl"> 
                <Heading  label={"Sign Up"}/>
                <SubHeading textInput={"Enter your information to create account."}/>
                <InputBox label={"First Name"} placeholder={"Samarth"} onChange={(e) => {
                    setFirstName(e.target.value);
                }}/>
                <InputBox label={"Last Name"} placeholder={"Patel"} onChange={(e) => {
                    setLastName(e.target.value);
                }}/>
                <InputBox label={"User Name"} placeholder={"xyz@gmail.com"} onChange={(e) => {
                    setUserName(e.target.value);
                }}/>
                <InputBox label={"Password"} placeholder={"123456"} onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
                <Button label={"Sign Up!"} nextLable={"Proceed"} onclick={ async () => {
                    try {
                        const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            userName, 
                            password, 
                            firstName, 
                            lastName
                        });
                        localStorage.setItem("token", res.data.token);
                        navigate("/dashboard?id=" + res.data.id + "&firstName=" + firstName + "&lastName=" + lastName);
                    }
                    catch(err) {
                        console.log(err.response.data);
                        alert(err.response.data.message);
                    }
                }}/>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"}/> 
            </div>
        </div>
    </div>
}