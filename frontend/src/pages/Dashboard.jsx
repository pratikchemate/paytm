import { useEffect, useState } from "react";
import { Avatar } from "../components/Avatar";
import { Balance } from "../components/Balance";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import {useRecoilValue} from "recoil"
import { userAtom } from "../atoms/userAtom"
import { Users } from "../components/userSearch";
export function Dashboard (){

    
    


    return(
        <div>
            <Users></Users>
            
        </div>
    )
}
