import Navbar from "../components/Navbar";
import CreateBook from "../components/CreateBook";
import Transaction from "../components/Transactions";

export default function Admin(){
    return(
        <>
        <Navbar/>
        <Link to="/dashboard" className="bg-slate-700 px-4 py-2 rounded-lg">
          &larr; Back
        </Link>
        <h2 className="flex justify-center bg-slate-700 text-white text-3xl pt-5">Admin Panel</h2>
        <CreateBook/>
        <Transaction/>
        </>
    )
}