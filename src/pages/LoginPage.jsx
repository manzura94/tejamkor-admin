import { Button } from "antd";
import React, { useState, useContext } from "react";
import { UserContext } from "../context/Context";
import { LoadingContext } from "../context/LoadingContext";
import { authHost } from "../utils/https";
import { login } from "../utils/urls";

const inputErrors ={
  username: false, 
  pwd: false
}
const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const {loading ,setLoading} =useContext(LoadingContext)
  const [username, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr]=useState(inputErrors)

  const validate =(name, value)=>{
    let clone ={...err}
    if(value.length === 0){
      clone[name] =true
    }else{
      clone[name]=false
    }
    setErr(clone)
  }

  const onChange =(e)=>{
    let name = e.target.name
    let value = e.target.value
    validate(name, value)
    if(name ==="username"){
      setUserName(value)
    }
    if(name==="pwd"){
      setPwd(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let value = true
    if(username.length === 0 || pwd.length === 0){
      let result = {
        username: true,
        pwd: true
      }
      value = false
      setErr(result)
    }
    if(value){
     setLoading(true)
    const { data } = await authHost.post(`${login}`, { username, pwd });
    localStorage.setItem("accessToken", data.data.tokens.accessToken);
    localStorage.setItem("refreshToken", data.data.tokens.refreshToken);
    localStorage.setItem("id", data.data.id);
    localStorage.setItem("user", true);
    window.location ='/'
    setUser(true);
    setLoading(false)
    }
  };
  return (
    <div className="form-wrapper">
      <form className="loginForm">
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          id="userName"
          name="username"
          value={username}
          onChange={(e) => onChange(e)}
          className={err?.username ? "error" : "loginForm-input"}

        />
        <label htmlFor="password">Password</label>
        <input
          value={pwd}
          type="password"
          id="password"
          name="pwd"
          onChange={(e) => onChange(e)}
          className={err?.pwd ? "error" : "loginForm-input"}

        />
        <Button
          className="form__submit-btn from__btn"
          type="primary"
          onClick={(e) => handleSubmit(e)}
          loading={loading}
        >
          submit
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
