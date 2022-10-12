import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {  Spin } from "antd";
import { authHost } from "../utils/https";
import {  logout } from "../utils/urls";
import { LoadingContext } from "../context/LoadingContext";
import { useEffect } from "react";
import { UserContext } from "../context/Context";

const LogOutPage = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);
  const { setUser } = useContext(UserContext);

  const changeUser = async () => {
    setLoading(true);
    const res = await authHost.post(`${logout}`);
    console.log(res);
    setUser(false);
    navigate("/login");
    localStorage.clear();
    setLoading(false);
  };

  useEffect(() => {
    changeUser();
  }, []);
  return (
    <div className="example">
      <Spin size="large" />
    </div>
  );
};

export default LogOutPage;
