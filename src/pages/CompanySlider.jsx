import React, { useState,useContext } from "react";
import { Space, Table, Button, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import AddCompanySlider from "../Components/AddCompanySlider";
import { authHost } from "../utils/https";
import { useEffect } from "react";
import { companyslider } from "../utils/urls";
import useLanguage from "../utils/useLanguage";
import { LangActive } from "../context/LangActive";
import { LoadingContext } from "../context/LoadingContext";

const { Column } = Table;

const CompanySlider = () => {
  const translate = useLanguage();
  const langUz = LangActive();
  const {loading, setLoading}=useContext(LoadingContext)

  const [companySlider, setCompanySlider] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addNewSlider = () => {
    setOpen(true);
  };

  const editCompanySlider = (record) => {
    setOpen(true);
    setSelected(record);
    setIsEditing(true);
  };

  const deleteCompanySlider = async (record) => {
    let id = record.id;
    await authHost.delete(`${companyslider}/${id}`, companySlider);
    let filtered = companySlider.filter((item) => item.id !== id);
    setCompanySlider(filtered);
  };

  const fetchCompanySlider = async () => {
    setLoading(true)
    const res = await authHost.get(`${companyslider}`, companySlider);
    setCompanySlider(res.data.data);
    setLoading(false)
  };

  useEffect(() => {
    fetchCompanySlider();
  }, []);
  return (
    <div>
      <Button
      loading={loading}
        className="table__addRow-btn"
        type="primary"
        onClick={addNewSlider}
        style={{
          marginBottom: 16,
        }}
      >
        {translate("Add")}
      </Button>
      <Table
        dataSource={companySlider}
        pagination={false}
        rowKey="id"
        className="listTable"
        loading={loading}
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
        <Column
          title={translate("Title")}
          dataIndex={translate(langUz ? "title" : "title_ru")}
          key="title"
        />
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
          key="action"
          render={(_, record) => (
            <Space size="middle" key={record.id}>
              <a onClick={() => editCompanySlider(record)}>
                {translate("Edit")}
              </a>
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
                onConfirm={() => deleteCompanySlider(record)}
                okText={translate("Yes")}
                cancelText={translate("No")}
              >
                <a>{translate("Delete")}</a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      <AddCompanySlider
        open={open}
        setOpen={setOpen}
        selected={selected}
        setSelected={setSelected}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        fetchCompanySlider={fetchCompanySlider}
      />
    </div>
  );
};

export default CompanySlider;
