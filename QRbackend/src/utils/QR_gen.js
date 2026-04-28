const QRCode= require("qrcode")

const generateQR=async(text)=>{
    try{
        const qr=await QRCode.toDataURL(text);
        return qr;
    }catch(err){
        throw err
    }
}

module.exports=generateQR