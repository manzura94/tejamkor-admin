import React, { useState } from "react";
import { Button,  Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import useLanguage from "../utils/useLanguage";
import MenuPageDrawer from "../pages/MenuPageDrawer";
import {sortMenu} from "../utils/helpers";

const { Panel } = Collapse;

const parents = [
  {
    id: 1,
    title: "this is parent",
    parent: 0,
  },
  {
    id: 4,
    title: "this is a parent",
    parent: 0,
  },

  {
    id: 5,
    title: "this is a parent",
    parent: 0,
  },
  {
    id: 2,
    title: "this is a child",
    parent: 1,
  },
  {
    id: 3,
    title: "this is a child",
    parent: 1,
  },
];

const MenuPage = () => {
  const translate = useLanguage();
  const [open, setOpen] = useState(false);
  let menu = sortMenu(parents);

  const onAddMenu = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button
        className="table__addRow-btn"
        type="primary"
        onClick={() => onAddMenu()}
        style={{
          marginBottom: 16,
        }}
      >
        {translate("Add")}
      </Button>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        className="site-collapse-custom-collapse"
      >
        {menu.map((item) => (
          <Panel
            header={item.title}
            key={item.id}
            className="site-collapse-custom-panel"
          >
           <div>{item.children.map((child)=>(
            <p key={child.id}>{child.title}</p>
           ))}</div>
          </Panel>
        ))}
      </Collapse>
      <MenuPageDrawer open={open} setOpen={setOpen} />
    </div>
  );
};

export default MenuPage;
