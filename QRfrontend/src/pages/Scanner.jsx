import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import API from "../api/axios";
import { Link } from "react-router-dom";

export default function Scanner() {
  const [mode, setMode] = useState("issue");

  const scannerRef = useRef(null);
  const isRunningRef = useRef(false);

  useEffect(() => {
  const initScanner = async () => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode("reader");
    }
    const scanner = scannerRef.current;

    if (isRunningRef.current) {
      await scanner.stop();
      isRunningRef.current = false;
    }

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        async (decodedText) => {
  try {
    const endpoint = mode === "issue" ? "/transaction/issue" : "/transaction/return";

    await API.post(endpoint, { bookQR: decodedText });

    alert(`Book ${mode} successful`);

    // Stop scanner after success
    if (scannerRef.current && isRunningRef.current) {
      await scannerRef.current.stop();
      isRunningRef.current = false;
    }
  } catch (err) {
    // console.error("Error scanning:", err);
    alert("Error scanning");
  }
}
      )
      .then(() => {
        isRunningRef.current = true;
      })
      .catch((err) => console.log("Start error:", err));
  };

  initScanner();

  return () => {
    if (scannerRef.current && isRunningRef.current) {
      scannerRef.current.stop().then(() => {
        isRunningRef.current = false;
      });
    }
  };
}, [mode]);

  return (
    <div className="p-6 block bg-slate-700 h-[100vh]">
      {/* <a href="/dashboard" className="text-end text-white">&larr; Back</a> */}
      <Link to="/dashboard" className="text-end text-white">&larr; Back</Link>
      <h2 className="text-xl mb-4 text-white">Scanner</h2>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setMode("issue")}
          className={`px-4 py-2 rounded ${
            mode === "issue" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          Issue
        </button>

        <button
          onClick={() => setMode("return")}
          className={`px-4 py-2 rounded ${
            mode === "return" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Return
        </button>
      </div>

      <div id="reader" className="w-[300px]" />
    </div>
  );
}