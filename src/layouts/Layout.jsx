import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { Layout, Menu, PageHeader, Space, Dropdown, Avatar } from "antd";
import { UserOutlined, GlobalOutlined } from "@ant-design/icons";
import { routes, menubar, loginRoutes } from "../utils/routes";
import { LanguageContext } from "../context/LanguageContext";
import { UserContext } from "../context/Context";
import LoginPage from "../pages/LoginPage";
import Logo from "../Components/Logo";
import useLanguage from "../utils/useLanguage";
import LogOutPage from "../pages/LogOutPage";
import LogOutBtn from "../Components/LogoutBtn";

const { Content, Sider } = Layout;

const $Layout = () => {
  const { user } = useContext(UserContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const [activeMenu, setActiveMenu] = useState(["1"]);
  const location = useLocation();
  const translate = useLanguage();

  const chooseLang = (
    <Menu
      items={[
        {
          label: <a onClick={() => setLanguage("uz")}>Uz</a>,
          key: "0",
        },
        {
          label: <a onClick={() => setLanguage("ru")}>Ru</a>,
          key: "1",
        },
      ]}
    />
  );

  useEffect(() => {
    for (let item of menubar) {
      if (item.path === location.pathname) {
        setActiveMenu([`${item.id}`]);
      }
    }
  }, [location]);

  return (
    <>
      {user ? (
        <Layout>
          <PageHeader
            title={<Logo />}
            extra={[
              <Dropdown
                key={"1"}
                overlay={chooseLang}
                trigger={["click"]}
                placement="bottomRight"
              >
                <button key={"1"} className="language__btn">
                  <GlobalOutlined style={{ color: "#fff" }} />
                  <span>{language}</span>
                </button>
              </Dropdown>,
              <Dropdown
                key={"2"}
                overlay={<LogOutBtn />}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Space>
                  <Avatar size={"large"} icon={<UserOutlined />} />
                </Space>
              </Dropdown>,
            ]}
          />
          <Layout>
            <Sider width={300}>
              <Menu
                mode="inline"
                selectedKeys={activeMenu}
                items={menubar.map((item) => ({
                  key: item.id,
                  label: (
                    <Link to={item.path}>{translate(`${item.title}`)}</Link>
                  ),
                }))}
              />
            </Sider>
            <Layout>
              <Content>
                <Routes>
                  {routes.map((item) => (
                    <Route
                      key={item.id}
                      path={item.path}
                      element={React.createElement(item.component)}
                    />
                  ))}
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/logout" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
};

export default $Layout;
