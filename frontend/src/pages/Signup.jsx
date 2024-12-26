import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";

export const Signup = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const appStyle = {
    backgroundImage: "url('/paytm_b.jpg')",
    backgroundSize: "cover", // Adjust to fit the container
    backgroundRepeat: "no-repeat",
    height: "100vh", // Full viewport height
    width: "100%",
  };

  return (
    <div style={appStyle}>
      <div className="bg-gray-100 w-screen h-screen  grid grid-rows-10">
        <img className="w-36 h-17 mt-2 ml-2 span-row-1" src="/paytm.jpg"></img>
        <div className="  grid place-items-center span-row-9">
          <div className="h-full bg-white shadow-md rounded-xl ">
            <div className="grid place-items-center">
              <Heading label="Sign up"></Heading>
              <SubHeading label="Enter Details to Signup for PayTm"></SubHeading>
            </div>

            <div className="pr-6 pl-6 pt-4">
              <InputBox
                label="First Name"
                placeholder="John"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              ></InputBox>
              <InputBox
                label="Last Name"
                placeholder="Doe"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              ></InputBox>
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
            <div className="px-10 py-2">
              {" "}
              <Button
                label="Sign up"
                onClick={async () => {
                  try {
                    const response = await axios
                      .post(
                        "https://poor-tm-backend.vercel.app/api/v1/user/signup",
                        {
                          username,
                          password,
                          firstName,
                          lastName,
                        }
                      )
                      .then((res) => {
                        console.log(res);
                        if (res.data.status == "error") {
                          alert(res.data.message);
                        } else {
                          localStorage.setItem("token", res.data.token);
                          setUser({
                            username: username,
                            firstName: firstName,
                            lastName: lastName,
                          });
                          navigate("/dashboard");
                        }
                      });
                  } catch (error) {
                    console.log(error);
                    alert("Wrong Email !!!");
                  }
                }}
              ></Button>
            </div>
            <BottomWarning
              label="Already have an Account?"
              buttonText="Signin"
              to="/signin"
            ></BottomWarning>
          </div>
        </div>
      </div>
    </div>
  );
};
