import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { RecoilRoot } from "recoil";
import { Sucess } from "./pages/Sucess";
import "./App.css";
import React from "react";

function App() {
  const appStyle = {
    backgroundImage: "url('/paytm_b.jpg')",
    backgroundSize: "cover", // Adjust to fit the container
    backgroundRepeat: "no-repeat",
    height: "100vh", // Full viewport height
    width: "100%",
  };
  return (
    <RecoilRoot>
      <div>
        {/* helllo */}
        <div style={appStyle}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/signup" replace />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/send" element={<SendMoney />} />
              <Route path="/success" element={<Sucess />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
