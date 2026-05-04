import { useEffect,useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function QRgallery(){
    const[qrCodes,setQrCodes]=useState([])

    useEffect(()=>{
        API.get("/books/getAllQR")
        .then(res=>{
            // console.log(res.data);
            setQrCodes(res.data.data)
        })
        .catch(err => console.error(err))
    },[])
    return (
    <div className="min-h-screen bg-slate-800 p-6">
        {/* <a href="/dashboard" className="text-white font-extrabold">&larr; Back</a> */}
        <Link to="/dashboard" className="text-white font-extrabold">&larr; Back</Link>
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        📦 All QR Codes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 justify-items-center">
        {qrCodes.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow text-center w-70 h-90">
            <p className="text-lg mb-2">{item.bookTitle}</p>
            <p className="text-sm">{item.qrCode}</p>
            <div className="flex items-center justify-center">
              <img src={item.qrImage} alt="QR Code" className="w-[200px] content-center" />
            </div>
            <p
            className={`text-sm font-semibold ${
              item.status === "available"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {item.status}
          </p>
            <a href={item.qrCode}
            download={`qr-${item._id}.png`}
            className="text-blue-500 text-sm"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
