export default function QRList({copies}){
    // console.log("copies:",copies);
    
    return(
        <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">QR Codes</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {copies.map((c) => (
          <div
            key={c._id}
            className="bg-white shadow rounded-xl p-3 text-center"
          >
            <img
              src={c.qrImage}
              alt="QR"
              className="mx-auto mb-2"
            />
            <p className="text-xs text-gray-500">{c._id}</p>
            <p
            className={`mt-1 text-sm font-semibold ${
              copies.status === "available"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {copies.status}
          </p>
            <a href={c.qrCode}
            download={`qr-${c._id}.png`}
            className="text-blue-500 text-sm"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
    )
}