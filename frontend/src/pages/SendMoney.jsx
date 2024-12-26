import { useState } from "react";
import { Avatar } from "../components/Avatar";
import { InputBox } from "../components/InputBox";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
export function SendMoney (){
    const navigate = useNavigate();
    const[amount, setAmount] = useState(0)
    const [searchParams] = useSearchParams();
    const username = searchParams.get("username");
    const firstName = searchParams.get("firstName");
    const lastName = searchParams.get("lastName")
    return(
        <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
            <div className=" max-h-screen grid grid-rows gap-2 bg-white shadow-md rounded-xl p-4" >
                <div className="flex justify-center text-4xl">Send Money</div>
                <div className="flex "> 
                    <Avatar icon={firstName.charAt(0)}> </Avatar>
                    <div className="flex justify-center items-center text-2xl"> {firstName +" "+lastName}</div>
                </div>
                <InputBox label="Amount (in Rs)" placeholder="Enter Amount" onChange={(e)=>{setAmount(e.target.value)}}></InputBox>
                <button onClick={async ()=>{
                    const response = await axios.post(`https://poor-tm-backend.vercel.app/api/v1/account/transfer?amount=${amount}&to=${username}`,{
                        to: username,
                        amount
                    }, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }}
                ).then((res)=>{
                        if(res.data.status == "success" || res.data.status == "sucess"){
                            console.log(res.data)
                            navigate("/success")
                        }else{
                            
                            alert(res.data.message)
                        }
                    })
                    
                }} type= "button" className="mt-4 w-11/12 h-10 mx-4 text-white bg-gradient-to-r from-green-500 via-green-600 to-green-600 hover:bg-gradient-to-br  focus:ring-green-300 font-medium rounded-lg text-2xl "> Initiate Transfer</button>
            </div>
        </div>
    )
}

