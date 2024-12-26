import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { Avatar } from "./Avatar";
import { useNavigate } from "react-router-dom";
import { Balance } from "./Balance";
import { InputBox } from "./InputBox";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/userAtom";

export const Users = () => {
  // Replace with backend call
  const [searchValue, setSearchValue] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchValue) {
        // Only fetch if search is not empty
        try {
          const response = await axios.get(
            `https://poor-tm-backend.vercel.app/api/v1/user/users?filter=${searchValue}`
          );
          //console.log(response.data)
          setSearchResults(response.data.user); // Store the results in state
        } catch (error) {
          console.error("Error fetching search results", error);
        }
      } else {
        setSearchResults([]); // Clear results when input is empty
      }
    };

    fetchSearchResults();
    // console.log(searchResults)
    // console.log("usefeect")
  }, [searchValue]);

  return (
    <>
      <div>
        <div className="bg-gray-100 w-screen h-screen grid grid-rows-10 justify-items-start">
          <div className="w-50 h-20 mt-2 pl-2  shadow-md w-full bg-white flex justify-between">
            <img className="w-36 h-14 mt-2 ml-2 " src="/paytm.jpg"></img>
            <div className="flex items-center">
              {" "}
              Hello {user.firstName}{" "}
              <Avatar icon={user.firstName.charAt(0)}></Avatar>
            </div>
          </div>

          <div className="bg-white w-full h-11/12 shadow-md rounded-xl mt-10 row-span-9 ">
            <div className="ml-10 mb-14 mt-4">
              <Balance></Balance>
            </div>

            <div className="w-2/3 ml-10">
              <InputBox
                label="Send Money"
                placeholder="Type Name to Send Money"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              ></InputBox>
              <div className="grid grid-rows-5">
                {searchResults.map((user, key) => (
                  <User user={user} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between p-2">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
          <div>{user.username}</div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <button
          onClick={(e) => {
            navigate(
              "/send?username=" +
                user.username +
                "&firstName=" +
                user.firstName +
                "&lastName=" +
                user.lastName
            );
          }}
          type="button"
          className="bg-gradient-to-r bg-green-600 hover:bg-green-800 focus:ring-2 focus:ring-green-300 font-medium rounded-lg text-2xl ring-1 ring-black"
        >
          <div className="text-white text-xl px-2 ">Send</div>
        </button>
      </div>
    </div>
  );
}
