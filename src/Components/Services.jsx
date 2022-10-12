import React, { useState, useEffect,useContext } from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import ServicesDrawer from "../pages/ServicesDrawer";
import useLanguage from "../utils/useLanguage";
import { authHost } from "../utils/https";
import { services } from "../utils/urls";
import { LangActive } from "../context/LangActive";
import { LoadingContext } from "../context/LoadingContext";

const { Column } = Table;



const Services = () => {
  const translate = useLanguage();
  const langUz = LangActive()
  const {loading, setLoading}=useContext(LoadingContext)

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [edit, setEdit] = useState(false);
  const [service, setService] = useState([]);

  const addServicesOpen = () => {
    setOpen(true);
  };

  const editServiceOpen = (item) => {
    setOpen(true);
    setEdit(true);
    setSelected(item);
  };

  const fetchServices =async () => {
    setLoading(true)
    const res = await authHost.get(`${services}`, service);
    setService(res.data.data);
    setLoading(false)
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div>
      <Button
      loading={loading}
        className="table__addRow-btn"
        type="primary"
        onClick={addServicesOpen}
        style={{
          marginBottom: 16,
        }}
      >
        {translate("Add")}
      </Button>
      <Table
        dataSource={service}
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
          title={translate("Description")}
          dataIndex={translate(langUz ? "description" : "description_ru")}
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
              <a onClick={() => editServiceOpen(record)}>{translate("Edit")}</a>
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
                // onConfirm={() => deleteHandler(record)}
                okText={translate("Yes")}
                cancelText={translate("No")}
              >
                <a>{translate("Delete")}</a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      <ServicesDrawer
        open={open}
        setOpen={setOpen}
        selected={selected}
        setSelected={setSelected}
        edit={edit}
        setEdit={setEdit}
        fetchServices={fetchServices}
      />
    </div>
  );
};

export default Services;
