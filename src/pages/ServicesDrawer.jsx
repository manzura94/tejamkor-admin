import React, { useState, useEffect } from "react";
import { Button, Drawer } from "antd";
import ReactQuill from "react-quill";
import useLanguage from "../utils/useLanguage";
import ImageUpload from "./ImageUpload";
import { slugify } from "../utils/helpers";
import { authHost } from "../utils/https";
import { services } from "../utils/urls";


const initial = {
  slug: "",
  title: "",
  title_ru: "",
  description: "",
  description_ru: "",
  content: "",
  content_ru: "",
  image: "",
};

const inputErrors = {
  title: false,
  title_ru: false,
  description: false,
  description_ru: false,
  content: false,
  content_ru: false,
  image: false,
};

const ServicesDrawer = ({
  open,
  setOpen,
  selected,
  setSelected,
  edit,
  setEdit,
  fetchServices,
}) => {
  const translate = useLanguage();
  const [data, setData] = useState(initial);
  const [fileList, setFileList] = useState([]);
  const [err, setErr] = useState(inputErrors);

  const onClose = () => {
    setOpen(false);
    setErr(inputErrors);
    setData(initial);
    setFileList([])
    setEdit(false);
    setSelected(0);
  };

  const validate = (name, value) => {
    let clone = { ...err };
    if (value.length === 0) {
      clone[name] = true;
    } else {
      clone[name] = false;
    }
    setErr(clone);
  };

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    validate(name, value);
    setData({
      ...data,
      [name]: value,
      slug: slugify(data.title),
    });
  };

  const addServicesHandler = async () => {
    const res = await authHost.post(`${services}`, data);
    setData(res.data);
    fetchServices();
    setOpen(false);
    setFileList([]);
    setData(initial);
  };

  const editServicesHandler = async () => {
    let id = data.id;
    const res = await authHost.patch(`${services}/${id}`, data);
    setData(res.data.data);
    fetchServices();
    setOpen(false);
    setFileList([]);
    setData(initial);
    setEdit(false);
    setSelected(0);
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
      edit ? editServicesHandler() : addServicesHandler();
    }
  };

  useEffect(() => {
    if (selected) {
      setData(selected);
    }
  }, [selected]);

  return (
    <Drawer
      title={translate("Fill out the form")}
      placement="right"
      onClose={onClose}
      open={open}
      width={"70%"}
    >
      <div className="form-container">
        <div className="companyForm">
          <div className="form__sections">
            <div className="form__sections-section">
              <label htmlFor="title">{translate("Title")}</label>
              <input
                type="text"
                id="title"
                name="title"
                value={data.title}
                onChange={(e) => onChange(e)}
                className={err?.title ? "error" : "input-default"}

              />
              {err?.title && <span className= "errorSpan">
                {translate("Enter title")}
              </span>}
            </div>
            <div className="form__sections-section">
              <label htmlFor="title_ru">{translate("Title in russian")}</label>
              <input
                type="text"
                id="title_ru"
                name="title_ru"
                value={data.title_ru}
                onChange={(e) => onChange(e)}
                className={err?.title_ru ? "error" : "input-default"}

              />
              {err?.title_ru && <span className= "errorSpan">
                {translate("Enter title in russian")}
              </span>}
            </div>
          </div>
          <div className="form__sections">
            <div className="form__sections-section">
              <label htmlFor="description">{translate("Description")}</label>
              <input
                type="text"
                id="description"
                name="description"
                value={data.description}
                onChange={(e) => onChange(e)}
                className={err?.description ? "error" : "input-default"}

              />
              {err?.description && <span className= "errorSpan">
                {translate("Enter description")}
              </span>}
            </div>
            <div className="form__sections-section">
              <label htmlFor="description_ru">
                {translate("Description in russian")}
              </label>
              <input
                type="text"
                id="description_ru"
                name="description_ru"
                value={data.description_ru}
                onChange={(e) => onChange(e)}
                className={err?.description_ru ? "error" : "input-default"}

              />
              {err?.description_ru && <span className= "errorSpan">
                {translate("Enter description in russian")}
              </span>}
            </div>
          </div>
          <div className="form__sections">
            <div className="form__sections-section">
              <label htmlFor="content">{translate("Content")}</label>
                 <ReactQuill
                theme="snow"
                name="content"
                value={data.content}
                onChange={(newValue, _, source) => {
                  if (source === "content") {
                    setData({ ...data, content: newValue });
                  }
                }}
                className={err?.content_ru ? "error" : "input-default"}
              />
              {err?.content && <span className= "errorSpan">
                {translate("Enter content")}
              </span>}
            </div>
            <div className="form__sections-section">
              <label htmlFor="content_ru">
                {translate("Content in russian")}
              </label>
                 <ReactQuill
                theme="snow"
                name="content_ru"
                value={data.content_ru}
                onChange={(newValue, _, source) => {
                  if (source === "content_ru") {
                    setData({ ...data, content_ru: newValue });
                  }
                }}
                className={err?.content_ru ? "error" : "input-default"}
              />
              {err?.content_ru && <span className= "errorSpan">
                {translate("Enter content in russian")}
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
        </div>
      </div>
    </Drawer>
  );
};

export default ServicesDrawer;
