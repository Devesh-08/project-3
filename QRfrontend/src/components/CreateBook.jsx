import { useState } from "react";
import API from "../api/axios";
import QRList from "./QRList";

export default function CreateBook(){
    const [form,setForm]=useState({
        title:"",
        author:"",
        totalCopies:1
    })
    const[copies,setCopies]=useState([])

    const handleChange =(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    const handleCreate=async()=>{
        if(!form.title || !form.author || !form.totalCopies){
            return alert("all fields are required")
        }

        if(form.totalCopies <=0){
            return alert("copies must be greater than 0")
        }

        try {
            const res = await API.post("/books/create",{
                totalCopies:Number(form.totalCopies),
                title:String(form.title),
                author:String(form.author)
            })
            console.log("api",res.data);
            
            setCopies(res.data.data.copies)

            alert("Book created successfully")

            setForm({
                title:"",
                author:"",
                totalCopies:""
            })
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create book")
        }
    }
    return(
        <div className="min-h-screen bg-slate-700 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6 text-center">
          📘 Add New Book
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Book Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter book title"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Author */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Author</label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Enter author name"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Copies */}
        <div className="mb-6">
          <label className="block text-sm mb-1">Total Copies</label>
          <input
            type="number"
            name="totalCopies"
            value={form.totalCopies}
            onChange={handleChange}
            placeholder="Enter number of copies"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleCreate}
          
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-400 transition"
        >
          Create
        </button>

        {copies.length >0 && <QRList copies={copies}/>}

      </div>
    </div>
    )
}