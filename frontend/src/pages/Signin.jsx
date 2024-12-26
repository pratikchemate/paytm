import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 w-screen h-screen  grid grid-rows-10">
      <img className="w-36 h-14 mt-2 ml-2 span-row-1" src="/Paytm.jpg"></img>
      <div className="  grid place-items-center span-row-9">
        <div className="h-full bg-white shadow-md rounded-xl">
          <div className="grid place-items-center ">
            <Heading label="Sign in"></Heading>
            <SubHeading label="Enter Details to Signin for Paytm"></SubHeading>
          </div>

          <div className="pr-6 pl-6  mb-16">
            <InputBox
              label="Email"
              placeholder="abc@example.com"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></InputBox>
            <InputBox
              label="Password"
              placeholder="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></InputBox>
          </div>
          <div className="px-10 ">
            {" "}
            <Button
              label="Sign in"
              onClick={async () => {
                try {
                  const response = await axios.post(
                    "https://poor-tm-backend.vercel.app/api/v1/user/signin",
                    {
                      username,
                      password,
                    }
                  );
                  console.log(response.data);
                  if (response.data.status == "error") {
                    alert(response.data.message);
                  } else {
                    localStorage.setItem("token", response.data.token);
                    setUser({
                      ...user,
                      firstName: response.data.firstName,
                      username: username,
                    });
                    navigate("/dashboard");
                  }
                } catch (error) {
                  console.log("error" + error);
                  alert("Wrong Email/Password");
                }
              }}
            ></Button>{" "}
          </div>
          <BottomWarning
            label="New User?"
            buttonText="Signup"
            to="/signup"
          ></BottomWarning>
        </div>
      </div>
    </div>
  );
}
