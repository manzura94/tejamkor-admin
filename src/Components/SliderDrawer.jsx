import React, { useState, useEffect } from "react";
import { Button, Drawer } from "antd";
import useLanguage from "../utils/useLanguage";
import ImageUpload from "../pages/ImageUpload";
import { authHost } from "../utils/https";
import { slider } from "../utils/urls";
import { validate } from "../utils/helpers";

const initial = {
  title: "",
  title_ru: "",
  subtitle: "",
  subtitle_ru: "",
  image: "",
  video: "",
};

const inputErrors = {
  title: false,
  title_ru: false,
  subtitle: false,
  subtitle_ru: false,
  image: false,
  video: false,
};

const SliderDrawer = ({
  open,
  setOpen,
  select,
  setSelect,
  isEditing,
  setIsEditing,
  fetchSlider,
}) => {
  const translate = useLanguage();
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState(initial);
  const [err, setErr] = useState(inputErrors);

  const onClose = () => {
    setOpen(false);
    setIsEditing(false);
    setSelect(0);
    setData(initial);
    setFileList([]);
    setErr(inputErrors);
  };

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    validate(name, value, err, setErr);
    setData({ ...data, [name]: value });
  };

  const addSliderHandle = async () => {
    const res = await authHost.post(`${slider}`, data);
    setData(res.data);
    fetchSlider();
    setOpen(false);
    setFileList([]);
    setData(initial);
  };

  const editSliderHandle = async () => {
    let id = data.id;
    const res = await authHost.patch(`${slider}/${id}`, data);
    setData(res.data.data);
    fetchSlider();
    setIsEditing(false);
    setFileList([]);
    setSelect(0);
    setData(initial);
    setOpen(false);
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
      isEditing ? editSliderHandle() : addSliderHandle();
    }
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
              <label htmlFor="subtitle">{translate("Subtitle")}</label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                value={data.subtitle}
                onChange={(e) => onChange(e)}
                className={err?.subtitle ? "error" : "input-default"}

              />
              {err?.subtitle && <span className= "errorSpan">
                {translate("Enter subtitle")}
              </span>}
            </div>
            <div className="form__sections-section">
              <label htmlFor="subtitle_ru">
                {translate("Subtitle in russian")}
              </label>
              <input
                type="text"
                id="subtitle_ru"
                name="subtitle_ru"
                value={data.subtitle_ru}
                onChange={(e) => onChange(e)}
                className={err?.subtitle_ru ? "error" : "input-default"}

              />
              {err?.subtitle_ru && <span className= "errorSpan">
                {translate("Enter subtitle in russian")}
              </span>}
            </div>
          </div>
          <div className="form__sections">
            <div className="form__image-cont">
              <label htmlFor="image">{translate("Image")}</label>
              <ImageUpload
                fileList={fileList}
                setFileList={setFileList}
                jsonData={data}
                setJsonData={setData}
                validate={validate}
                err={err}
              />
              {err?.image && <span className= "errorSpan">
                {translate("Submit image")}
              </span>}
            </div>
            <div className="form__sections-section">
              <label htmlFor="video">{translate("Submit video")}</label>
              <input
                type="text"
                id="video"
                name="video"
                value={data.video}
                onChange={(e) => onChange(e)}
                className={err?.video ? "error" : "input-default"}

              />
              {err?.video && <span className= "errorSpan">
                {translate("Link for video")}
              </span>}
            </div>
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

export default SliderDrawer;
