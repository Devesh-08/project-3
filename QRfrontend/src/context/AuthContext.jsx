import { createContext,useContext,useState } from "react";

const AuthContext=createContext()

export const useAuth=()=>useContext(AuthContext)

export default function AuthProvider({children}){
    const [user, setUser] = useState(() => {
    try {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
        console.error("Invalid user data in localStorage");
        return null;
    }
});

    const login=(data)=>{
        // console.log("Login recevied",data.data);
        
        const{accessToken,user}=data.data
        // console.log("Access:",accessToken);
        

        localStorage.setItem("token",accessToken)
        localStorage.setItem("user",JSON.stringify(user))
        setUser(user)
    }

    const logout=()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}