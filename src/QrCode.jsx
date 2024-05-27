import { useState } from "react"

const QrCode = () => {
    const [img, setImg]=useState("");
    const [loading, setLoading] = useState()
    const [qrData, setQrData] = useState("")
    const [qrSize, setQrSize] = useState("")

    async function genQr(){
        setLoading(true);
        try {
            const url =`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        } catch (error) {
            console.error("Error generating QR code", error)
        }
        finally{
            setLoading(false);
        }
    }

    function dwnQr(){
        fetch(img)
        .then((response)=>response.blob())
        .then((blob)=>{
            const link=document.createElement("a");
            link.href=URL.createObjectURL(blob);
            link.download="qrByMihsan.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((error)=>{
            console.error("Error dowloading Qr code:", error);
        });
    }
    
  return (
    <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please wait...</p>}
        {img && <img src={img}  className="qr-img"/>}
        <div>
            <label htmlFor="dataInput" className="input-label">
                Data for Qr code:
            </label>
            <input type="text" id="dataInput" placeholder="Enter data for QR" onChange={(e)=>setQrData(e.target.value)} value={qrData}></input>
            <label htmlFor="sizeInput" className="input-label">
                Image size(px) [eg.,150]:
            </label>
            <input type="text" id="sizeInput" placeholder="Enter image size" value={qrSize} onChange={(e)=>setQrSize(e.target.value)}></input>
            <button className="gen-btn" onClick={genQr} disabled={loading}>Generate Qr Code</button>
            <button className="dwn-btn" onClick={dwnQr}>Download Qr Code</button>
        </div>
        <p className="footer">Designed by <a href="https://mihsan17.github.io/mihsan/#">Mihsan Wakir</a></p>
    </div>
  )
}

export default QrCode
