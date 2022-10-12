import React, { useState, useEffect,useContext } from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import CompanyDrawer from "../pages/CompanyDrawer";
import { authHost } from "../utils/https";
import { company } from "../utils/urls";
import useLanguage from "../utils/useLanguage";
import {LangActive} from "../context/LangActive";
import { LoadingContext } from "../context/LoadingContext";

const { Column } = Table;

const Company = () => {
  const [companyList, setCompanyList] = useState([]);
  const [selectCompany, setSelectCompany] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const translate = useLanguage()
  const langUz = LangActive()
  const {setLoading, loading}=useContext(LoadingContext)

  const onEditCompany = (e, record) => {
    e.preventDefault();
    setOpen(true);
    setSelectCompany(record);
    setIsEditing(true);
  };

  const addNewCompany = () => {
    setOpen(true);
  };

  const onDeleteConfirm = async (item) => {
    let getId = item.id;
    await authHost.delete(`${company}/${getId}`, companyList);
    let filteredLIst = companyList.filter((item) => item.id !== getId);
    setCompanyList(filteredLIst);
  };

  const fetchCompany = async () => {
    setLoading(true)
    const res = await authHost.get(`${company}`, companyList);
    setCompanyList(res.data.data);
    setLoading(false)
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  return (
    <div>
      <Button
      loading={loading}
        className="table__addRow-btn"
        type="primary"
        onClick={addNewCompany}
        style={{
          marginBottom: 16,
        }}
      >
      {translate("Add")}
      </Button>

      <Table
        dataSource={companyList}
        pagination={false}
        rowKey="id"
        className="company__table"
        loading={loading}
      >
        <Column
          title={translate("Company logo")}
          dataIndex="logo"
          key="name"
          render={(text) => (
            <Space size="middle">
              <img src={text} alt="logo" />
            </Space>
          )}
        />
        <Column title={translate("Company Name")} dataIndex={translate(langUz ? "name" : "name_ru")} key="name" />
        <Column title={translate("Address")} dataIndex={translate(langUz ? "address": "address_ru")} key="address" />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle" key={record.id}>
              <a onClick={(e) => onEditCompany(e, record)}>{translate("Edit")}</a>
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
                onConfirm={() => onDeleteConfirm(record)}
                okText={translate("Yes")}
                cancelText={translate("No")}
              >
                <a>{translate("Delete")}</a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      <CompanyDrawer
        open={open}
        setOpen={setOpen}
        fetchCompany={fetchCompany}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        selectCompany={selectCompany}
        setSelectCompany={setSelectCompany}
      />
    </div>
  );
};

export default Company;
