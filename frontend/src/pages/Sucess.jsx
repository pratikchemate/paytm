import { useNavigate } from "react-router-dom"
export const Sucess = ()=>{
    const navigate = useNavigate()
    return (
        <div className="flex justify-center h-screen items-center bg-green-50">
            <div >
                <button className=" flex justify-center items-center h-32 w-60 bg-green-200 rounded-3xl text-4xl font-bold hover:ring-2 " onClick={()=>{navigate("/dashboard")}} > 
                    Success</button>
            </div>
        </div>
    )
}