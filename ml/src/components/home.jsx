import { useNavigate } from "react-router-dom"

export function Home(){
    const navigate=useNavigate();

    return <div className="w-screen h-screen flex justify-center bg-black text-white ">
        <div className="flex flex-col justify-center gap-12 w-full items-center h-full">
            <h1 className="text-6xl">CHATBOT</h1>
            <div className="mt-5">
                <button className="text-3xl border-2 border-solid border-white p-4 rounded-md" onClick={()=>{
                    navigate("/chat")
                }}>Click here to chat</button>
            </div>
            
        </div>
       
    </div>
}