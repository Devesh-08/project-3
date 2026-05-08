import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login(){
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const navigate=useNavigate()
    
    const {login}=useAuth()
    const handleLogin =async()=>{
        try {
            const res=await API.post("/users/login",{email,password})
            login(res.data)
            localStorage.setItem("role",res.data.data.user.role)
        // console.log("role",JSON.stringify(res.data.data.user.role));
        navigate("/dashboard")
        } catch (error) {
            alert(`User with this credential is not registered yet `)
        }
    }

    return (
        <div className=" min-h-screen  
            bg-slate-800">
            
            <div className="flex justify-center items-center h-40 flex-wrap">
            <h1 className="text-white text-3xl">Welcome To Qr Library WebApp !!</h1>
            </div>
            <div className="flex justify-center items-baseline min-h-screen">
            <div className="max-w-md p-8 w-full rounded-2xl bg-gray-100">

            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

            <div className="mb-4">
                <label className=" block text-sm mb-1">Email</label>
                <input 
                type="text"
                name="Email"
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-1">Password</label>
                <input 
                type="text"
                name="password"
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                />
            </div>

            <button
            onClick={handleLogin}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-400"
            >
                Login
            </button>

            <div className="flex justify-center text-sm">
            <p>
                Don't have an account?
                <span onClick={()=>navigate("/register")} style={{cursor:"pointer",color:"blue"}}>
                    Register
                </span>
            </p>
            </div>
            </div>
            </div>
        </div>
    )
}