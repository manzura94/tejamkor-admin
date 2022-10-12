import React, { useState, useEffect } from "react";
import { Button, Drawer } from "antd";
import useLanguage from "../utils/useLanguage";
import ImageUpload from "./ImageUpload";
import { authHost } from "../utils/https";
import { team } from "../utils/urls";
import { validate } from "../utils/helpers";

const initial = {
  name: "",
  name_ru: "",
  job: "",
  job_ru: "",
  image: "",
};

const inputErrors = {
  name: false,
  name_ru: false,
  job: false,
  job_ru: false,
  image: false,
};


const TeamDrawer = ({
  open,
  setOpen,
  select,
  setSelect,
  editing,
  setEditing,
  fetchTeam,
}) => {
  const translate = useLanguage();
  const [data, setData] = useState(initial);
  const [fileList, setFileList] = useState([]);
    const [err, setErr] = useState(inputErrors);


 

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    validate(name, value, err, setErr);
    setData({ ...data, [name]: value });
  };

  const addTeamHandler = async () => {
    const res = await authHost.post(`${team}`, data);
    setData(res.data);
    fetchTeam();
    setOpen(false);
    setFileList([]);
    setData(initial);
  };

  const editTeamHandler = async () => {
    let id = data.id;
    const res = await authHost.patch(`${team}/${id}`, data);
    setData(res.data.data);
    setEditing(false);
    setOpen(false);
    setFileList([]);
    setSelect(0);
    setData(initial);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let clone = { ...err };
    for (let key in data) {
      let el = data[key];
      if (el.length === 0) {
        clone[key] = true;
      }
    }
    setErr(clone);

    let value = Object.values(clone).every((item) => item === false);
    if (value) {
      editing ? editTeamHandler() : addTeamHandler();
    }
  };

  const onClose = () => {
    setOpen(false);
    setEditing(false);
    setSelect(0);
    setData(initial);
    setErr(inputErrors)
    setFileList([])
  };

  useEffect(() => {
    if (select) {
      setData(select);
    }
  }, [select]);
  return (
    <Drawer
      title={translate("Fill out the form")}
      placement="right"
      onClose={onClose}
      open={open}
      width={"70%"}
    >
      <div className="form-container">
        <form className="companyForm">
          <div className="form__sections">
            <div className="form__sections-section">
              <label htmlFor="name">{translate("Name")}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={(e) => onChange(e)}
                className={err?.name ? "error" : "input-default"}
              />
              {err?.name && <span className= "errorSpan">
                {translate("Enter name")}
              </span>}
            </div>
            <div className="form__sections-section">
              <label htmlFor="name_ru">{translate("Name in russian")}</label>
              <input
                type="text"
                id="name_ru"
                name="name_ru"
                value={data.name_ru}
                onChange={(e) => onChange(e)}
                className={err?.name_ru ? "error" : "input-default"}

              />
              {err?.name_ru && <span className= "errorSpan">
                {translate("Enter name in russian")}
              </span>}
            </div>
          </div>
          <div className="form__sections">
            <div className="form__sections-section">
              <label htmlFor="job">{translate("Job")}</label>
              <input
                type="text"
                id="job"
                name="job"
                value={data.job}
                onChange={(e) => onChange(e)}
                className={err?.job ? "error" : "input-default"}

              />
              {err?.job && <span className= "errorSpan">
                {translate("Enter job")}
              </span>}
            </div>
            <div className="form__sections-section">
              <label htmlFor="job_ru">{translate("Job in russian")}</label>
              <input
                type="text"
                id="job_ru"
                name="job_ru"
                value={data.job_ru}
                onChange={(e) => onChange(e)}
                className={err?.job_ru ? "error" : "input-default"}

              />
              {err?.job_ru && <span className= "errorSpan">
                {translate("Enter job in russian")}
              </span>}
            </div>
          </div>
          <div className="form__image-cont">
            <label htmlFor="image">{translate("Image")}</label>
            <ImageUpload
              jsonData={data}
              setJsonData={setData}
              fileList={fileList}
              setFileList={setFileList}
              validate={validate}
              err={err}
            />
            {err?.image && <span className= "errorSpan">
                {translate("Submit image")}
              </span>}
          </div>
          <Button
            type="primary"
            className="form__submit-btn"
            onClick={(e) => onSubmit(e)}
          >
            {translate("Save")}
          </Button>
        </form>
      </div>
    </Drawer>
  );
};

export default TeamDrawer;
