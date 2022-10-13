import React, { useState, useEffect,useContext } from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import useLanguage from "../utils/useLanguage";
import { authHost } from "../utils/https";
import { team } from "../utils/urls";
import TeamDrawer from "../Components/TeamDrawer";
import { LangActive } from "../context/LangActive";
import { LoadingContext } from "../context/LoadingContext";

const { Column } = Table;

const Team = () => {
  const translate = useLanguage();
  const langUz = LangActive();
  const {loading, setLoading}=useContext(LoadingContext)

  const [teamList, setTeamList] = useState([]);
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(null);
  const [editing, setEditing] = useState(false);

  const addTeamPanel = () => {
    setOpen(true);
  };

  const editTeamPanel = (item) => {
    setOpen(true);
    setEditing(true);
    setSelect(item);
  };

  const deleteHandler = async (item) => {
    let id = item.id;
    await authHost.delete(`${team}/${id}`, teamList);
    let filtered = teamList.filter((item) => item.id !== id);
    setTeamList(filtered);
  };

  const fetchTeam = async () => {
    setLoading(true)
    const res = await authHost.get(`${team}`, teamList);
    setTeamList(res.data.data);
    setLoading(false)
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <div>
      <Button
      loading={loading}
        className="table__addRow-btn"
        type="primary"
        onClick={addTeamPanel}
        style={{
          marginBottom: 16,
        }}
      >
        {translate("Add")}
      </Button>
      <Table
      loading={loading}
        dataSource={teamList}
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
          title={translate("Name")}
          dataIndex={translate(langUz ? "name" : "name_ru")}
          key="name"
        />
        <Column
          title={translate("Job")}
          dataIndex={translate(langUz ? "job" : "job_ru")}
          key="job"
        />
        <Column
          title="Action"
          dataIndex="action"
          key="action"
          render={(_, record) => (
            <Space size="middle" key={record.id}>
              <a onClick={() => editTeamPanel(record)}>{translate("Edit")}</a>
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
      <TeamDrawer
        open={open}
        setOpen={setOpen}
        select={select}
        setSelect={setSelect}
        editing={editing}
        setEditing={setEditing}
        fetchTeam={fetchTeam}
      />
    </div>
  );
};

export default Team;
