import React, { useState, useEffect, useContext } from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import NewsDriwer from "../pages/NewsDriwer";
import { authHost } from "../utils/https";
import { news } from "../utils/urls";
import useLanguage from "../utils/useLanguage";
import { LangActive } from "../context/LangActive";
import { LoadingContext } from "../context/LoadingContext";

const { Column } = Table;

const News = () => {
  const translate = useLanguage();
  const langUz = LangActive();
  const { loading, setLoading } = useContext(LoadingContext);

  const [newsList, setNewsList] = useState([]);
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(null);
  const [edit, setEdit] = useState(false);

  const addNewsHandler = () => {
    setOpen(true);
  };

  const editNewsHandler = (record) => {
    console.log(record);
    setOpen(true);
    setEdit(true);
    setSelect(record);
  };

  const deleteHandler = async (record) => {
    let id = record.id;
    await authHost.delete(`${news}/${id}`, newsList);
    let filtered = newsList.filter((item) => item.id !== id);
    setNewsList(filtered);
  };

  const fetchNewsList = async () => {
    setLoading(true);
    const res = await authHost.get(`${news}`, newsList);
    setNewsList(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNewsList();
    const local = localStorage.getItem("hi");
    console.log(local);
  }, []);

  return (
    <div>
      <Button
      loading={loading}
        className="table__addRow-btn"
        type="primary"
        onClick={addNewsHandler}
        style={{
          marginBottom: 16,
        }}
      >
        {translate("Add")}
      </Button>
      <Table
        loading={loading}
        dataSource={newsList}
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
        <Column
          title={translate("Title")}
          dataIndex={translate(langUz ? "title" : "title_ru")}
          key="title"
        />
        <Column
          title={translate("Intro")}
          dataIndex={translate(langUz ? "intro" : "intro_ru")}
          key="intro"
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
              <a onClick={() => editNewsHandler(record)}>{translate("Edit")}</a>
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
      <NewsDriwer
        open={open}
        setOpen={setOpen}
        select={select}
        setSelect={setSelect}
        edit={edit}
        setEdit={setEdit}
        fetchNewsList={fetchNewsList}
      />
    </div>
  );
};

export default News;
