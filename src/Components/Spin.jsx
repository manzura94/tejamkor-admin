import React,{ useContext } from "react";
import { Space, Spin } from "antd";
import { LoadingContext } from "../context/LoadingContext";


const Spinning = () => {
    const {loading} = useContext(LoadingContext)
  return ( loading &&
    <Space size={"middle"}>
      <Spin size="large" />
    </Space>
  );
};

export default Spinning;
