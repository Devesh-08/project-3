import Navbar from "../components/Navbar";
import CreateBook from "../components/CreateBook";
import Transaction from "../components/Transactions";

export default function Admin(){
    return(
        <>
        <Navbar/>
        <a href="/dashboard" className="w-full block bg-slate-700 text-white font-extrabold text-end pr-1">&larr; Back</a>
        <h2 className="flex justify-center bg-slate-700 text-white text-3xl pt-5">Admin Panel</h2>
        <CreateBook/>
        <Transaction/>
        </>
    )
}