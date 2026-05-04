import { useEffect, useEffectEvent, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function Dashboard() {
    const [books, setBooks] = useState([])
    // console.log("books:",books);

    useEffect(() => {
        fetchBooks()
    }, [])
    const role = localStorage.getItem("role")
    // console.log("dash role",role);
    

    const fetchBooks = async () => {
        const res = await API.get("/books/Allbooks")
        // console.log("res",res.data.data)
        setBooks(res.data.data)
    }

    const handleDelete=async(id)=>{
        try {
            await API.delete(`/books/delete/${id}`)
            alert("Book deleted")

            setBooks(prev => prev.filter(book => book._id !== id))
        } catch (error) {
            alert(error || "Delete failed")
        }
    }

    return (
        <div className="w-full min-h-screen bg-slate-700">
        <Navbar/>
        <h2 className="text-white text-4xl flex justify-center pt-4">All Books</h2>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {
            books.map((b) => (
                <div
                    key={b._id}
                    className="bg-white shadow-lg rounded-2xl p-4 hover:scale-105 transition"
                >
                    <h3 className="text-lg font-bold">{b.title}</h3>
                    <p className="text-gray-600">Author: {b.author}</p>
                    <p className="text-gray-800">TotalCopies: {b.totalCopies}</p>
                    <p className="text-gray-800">AvailableCopies: {b.availableCopies}</p> 
                    
                    {role==="admin" &&
                       ( <button onClick={()=> handleDelete(b._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400">
                        Delete
                    </button>)
                    }
                </div>
            ))}
        </div>
        </div>
    )
}