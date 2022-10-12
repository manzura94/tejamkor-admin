import React, { useEffect } from "react";
import $Layout from "./layouts/Layout";
import "antd/dist/antd.css";
import jwt_decode from "jwt-decode";
import { openToken } from "./utils/helpers";
import { useNavigate } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';


function App() {
  const refreshtoken = localStorage.getItem("refreshToken");
  const navigate =useNavigate()

  useEffect(() => {
    if (refreshtoken) {
      const token = openToken(refreshtoken);
      if (jwt_decode(token).exp < Date.now() / 1000) {
          navigate ( "/logout"); 
      }
    }
  }, []);

  return (
    <div>
      <$Layout />
    </div>
  );
}

export default App;
