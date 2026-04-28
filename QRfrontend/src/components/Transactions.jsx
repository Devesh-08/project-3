import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Transaction() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetchTransaction()
    }, [])

    const fetchTransaction = async () => {
        const res = await API.get("/transaction/allTransaction")
        setData(res.data.data || res.data)
    }

    return (
        <div className="p-6 bg-slate-700 min-h-screen">
            <h3 className="text-3xl font-bold mb-6 flex justify-center text-white">
                Transactions
            </h3>

            <div className="grid gap-4">
                {data.map((t) => (
                    <div
                        key={t._id}
                        className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition"
                    >
                        <p className="text-gray-700">
                            <span className="font-semibold">User:</span>{" "}
                            {t.userId?.name || "N/A"}
                        </p>

                        <p className="text-gray-700">
                            <span className="font-semibold">Book:</span>{" "}
                            {t.copyId?.bookId?.title || "N/A"}
                        </p>

                        <p className="text-gray-700">
                            <span className="font-semibold">Status:</span>{" "}
                            <span
                                className={`px-2 py-1 rounded text-sm font-medium ${t.status === "issued"
                                    ? "bg-blue-100 text-blue-600"
                                    : t.status === "returned"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-red-100 text-red-600"
                                    }`}
                            >
                                {t.status}
                            </span>
                        </p>

                        <p className="text-gray-700 font-semibold">
                            Fine: ₹{t.fine?.amount || 0}
                        </p>

                        <p className="font-semibold">
                            Paid:{" "}
                            <span
                                className={
                                    t.fine?.paid
                                        ? "text-green-600"
                                        : "text-red-500"
                                }
                            >
                                {t.fine?.paid ? "Yes" : "No"}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}