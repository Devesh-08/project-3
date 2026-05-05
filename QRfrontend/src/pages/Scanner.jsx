import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import API from "../api/axios";
import { Link } from "react-router-dom";

export default function Scanner() {
  const [mode, setMode] = useState("issue");
  const modeRef = useRef("issue");
  const scannerRef = useRef(null);
  
  // The "Gatekeeper" lock
  const isProcessingRef = useRef(false);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const scannerId = "reader";
    scannerRef.current = new Html5Qrcode(scannerId);

    const startScanner = async () => {
      try {
        await scannerRef.current.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          onScanSuccess
        );
      } catch (err) {
        console.error("Scanner failed to start:", err);
      }
    };

    const onScanSuccess = async (decodedText) => {
      // 1. Check if the lock is active. If true, ignore this scan frame.
      if (isProcessingRef.current) return;

      // 2. Immediately activate the lock
      isProcessingRef.current = true;

      try {
        const currentMode = modeRef.current;
        const endpoint = currentMode === "issue" ? "/transaction/issue" : "/transaction/return";

        await API.post(endpoint, { bookQR: decodedText });
        
        // 3. Show the alert. Code execution pauses here until user clicks "OK"
        alert(`Book ${currentMode} successful!`);

        // 4. After clicking OK, wait 2 seconds (cooldown) before unlocking
        // This prevents re-scanning the same book immediately.
        setTimeout(() => {
          isProcessingRef.current = false;
        }, 2000);

      } catch (err) {
        console.error("API Error:", err);
        alert("Transaction failed. Please try again.");
        
        // Unlock immediately on error so they can try again
        isProcessingRef.current = false;
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().then(() => scannerRef.current.clear());
      }
    };
  }, []);

  return (
    <div className="p-6 bg-slate-800 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white-400">Scanner</h2>
        <Link to="/dashboard" className="bg-slate-700 px-4 py-2 rounded-lg">
          &larr; Back
        </Link>
      </div>

      <div className="bg-slate-700 p-4 rounded-xl mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setMode("issue")}
            className={`flex-1 py-3 rounded-lg font-bold ${
              mode === "issue" ? "bg-green-500 shadow-lg" : "bg-slate-600"
            }`}
          >
            ISSUE
          </button>
          <button
            onClick={() => setMode("return")}
            className={`flex-1 py-3 rounded-lg font-bold ${
              mode === "return" ? "bg-blue-500 shadow-lg" : "bg-slate-600"
            }`}
          >
            RETURN
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div id="reader" className="w-full max-w-md rounded-2xl border-4 border-slate-600 bg-black overflow-hidden" />
        <p className="mt-4 text-slate-400 text-sm">
          {mode === "issue" ? "Ready to Issue..." : "Ready to Return..."}
        </p>
      </div>
    </div>
  );
}

