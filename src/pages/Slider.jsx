import React, { useState,useEffect,useContext } from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import useLanguage from "../utils/useLanguage";
import SliderDrawer from "../Components/SliderDrawer";
import { authHost } from "../utils/https";
import { slider } from "../utils/urls";
import { LangActive } from "../context/LangActive";
import { LoadingContext } from "../context/LoadingContext";

const { Column } = Table;


const Slider = () => {
  const translate = useLanguage();
  const langUz = LangActive()
  const {loading, setLoading}=useContext(LoadingContext)

  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sliderList, setSliderList]=useState([])

  const addSliderOpen = () => {
    setOpen(true);
  };

  const editSliderOpen = (item) => {
    setOpen(true);
    setIsEditing(true);
    setSelect(item);
  };

  const deleteHandler=async(item)=>{
    setLoading(true)
    await authHost.delete(`${slider}/${item.id}`, sliderList)
    let filtered = sliderList.filter((el)=>el.id !== item.id)
    setSliderList(filtered)
    setLoading(false)
  }

  const fetchSlider=async()=>{
 const res = await authHost.get(`${slider}`, sliderList)
  setSliderList(res.data.data)
  }

  useEffect(()=>{
    fetchSlider()
  },[])

  return (
    <div>
      <Button
      loading={loading}
        className="table__addRow-btn"
        type="primary"
        onClick={addSliderOpen}
        style={{
          marginBottom: 16,
        }}
      >
        {translate("Add")}
      </Button>
      <Table
        dataSource={sliderList}
        loading={loading}
        pagination={false}
        rowKey="id"
        className="company__table"
      >
        <Column
          title={translate("Image")}
          dataIndex="image"
          key="image"
          render={(text) => (
            <Space size="middle">
              <img src={text} alt="image" />
            </Space>
          )}
        />
        <Column title={translate("Title")} dataIndex={translate(langUz ? "title" : "title_ru")} key="title" />
        <Column
          title={translate("Subtitle")}
          dataIndex={translate(langUz ? "subtitle" : "subtitle_ru")}
          key="subtitle"
          render={(text) => (
            <Space size="middle">{text.length > 120? `${text.substring(0, 120)}...`: text}</Space>
          )}
        />
        <Column
          title="Action"
          dataIndex="action"
          key="action"
          render={(_, record) => (
            <Space size="middle" key={record.id}>
              <a onClick={() => editSliderOpen(record)}>{translate("Edit")}</a>
              <Popconfirm
                placement="leftBottom"
                title={translate("Do you want to delete it")}
                icon={
                  <QuestionCircleOutlined
                    style={{
                      color: "red",
                    }}
                  />
                }
                onConfirm={() => deleteHandler(record)}
                okText={translate("Yes")}
                cancelText={translate("No")}
              >
                <a>{translate("Delete")}</a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      <SliderDrawer
        open={open}
        setOpen={setOpen}
        select={select}
        setSelect={setSelect}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        fetchSlider={fetchSlider}
      />
    </div>
  );
};

export default Slider;
