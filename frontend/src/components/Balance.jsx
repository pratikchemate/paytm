import { useState ,useEffect} from "react";
import axios from "axios";
export const Balance = () => {
    const token = localStorage.getItem("token");
    const[balance,setBalance] = useState("0,000.00")

    useEffect(()=>{
        const fetchBalance = async()=> {
            const res = await axios.get("https://poor-tm-backend.vercel.app/api/v1/account/balance",{
            headers:{
                Authorization: `Bearer ${token}`}}
            )
            setBalance(Number(res.data.balance).toFixed(2))
        }
        fetchBalance()

    },[])

    return <div className="flex align items-end">
        <div className="font-bold text-lg">
            Your balance:
        </div>
        <div className="font-bold ml-4 text-4xl text-blue-900">
            Rs {balance}
        </div>
    </div>
}