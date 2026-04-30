import axios from 'axios'

const API=axios.create({
    baseURL:"https://project-3-3s2s.onrender.com" //backend
})

//attach jwt automatically
API.interceptors.request.use((req)=>{
    const token=localStorage.getItem("token")
    if(token){
        req.headers.Authorization=`Bearer ${token}`
    }
    return req
})

export default API