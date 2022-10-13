import React, { useState, useEffect } from "react";
import { Button, Drawer } from "antd";
import ImageUpload from "../pages/ImageUpload";
import { authHost } from "../utils/https";
import { companyslider } from "../utils/urls";
import useLanguage from "../utils/useLanguage";
import { validate } from "../utils/helpers";


let initial = {
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

const AddCompanySlider = ({
  open,
  setOpen,
  selected,
  isEditing,
  setSelected,
  setIsEditing,
  fetchCompanySlider,
}) => {
  const translate = useLanguage();

  const [data, setData] = useState(initial);
  const [fileList, setFileList] = useState([]);
  const [err, setErr] = useState(inputErrors);

  const onClose = () => {
    setOpen(false);
    setData(initial);
    setSelected(0);
    setIsEditing(false);
    setFileList([]);
    setErr(inputErrors);
  };

  const onAddNewSlider = async () => {
    const res = await authHost.post(`${companyslider}`, data);
    setData(res.data);
    fetchCompanySlider();
    setOpen(false);
    setFileList([]);
    setData(initial);
  };

  const onEditCompanySlider = async () => {
    let id = data.id;
    const res = await authHost.patch(`${companyslider}/${id}`, data);
    setData(res.data.data);
    fetchCompanySlider();
    setOpen(false);
    setFileList([]);
    setData(initial);
    setIsEditing(false);
  };

 

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    validate(name, value,err, setErr);
    setData({ ...data, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let errorClone = { ...err };
    for (let key in data) {
      let el = data[key];
      if (el.length === 0) {
        errorClone[key] = true;
      }
    }
    setErr(errorClone);

    let value = Object.values(errorClone).every((item) => item === false);

    if (value) {
      isEditing ? onEditCompanySlider() : onAddNewSlider();
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
      <div className="companySlider__form-container">
        <form className="companyForm" onSubmit={(e) => onSubmit(e)}>
          <div className="form__sections">
            <div className="form__sections-section">
              <label htmlFor="title">{translate("Title")}</label>
              <input
                type="text"
                id="title"
                name="title"
                value={data.title}
                onChange={(e) => handleInputChange(e)}
                className={err?.title ? "error" : "input-default"}
              />
              {err?.title && (
                <span className="errorSpan">{translate("Enter title")}</span>
              )}
            </div>
            <div className="form__sections-section">
              <label htmlFor="title_ru">{translate("Title in russian")}</label>
              <input
                type="text"
                id="title_ru"
                name="title_ru"
                value={data.title_ru}
                onChange={(e) => handleInputChange(e)}
                className={err?.title_ru ? "error" : "input-default"}
              />
              {err?.title_ru && (
                <span className="errorSpan">
                  {translate("Enter title in russian")}
                </span>
              )}
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
                className={err?.subtitle ? "error" : "input-default"}
                onChange={(e) => handleInputChange(e)}
              />
              {err?.subtitle && (
                <span className="errorSpan">{translate("Enter subtitle")}</span>
              )}
            </div>
            <div className="form__sections-section">
              <label htmlFor="subtitle_ru">
                {translate("Subtitle in russian")}
              </label>
              <input
                type="text"
                id="subtitle_ru"
                className={err?.subtitle_ru ? "error" : "input-default"}
                name="subtitle_ru"
                value={data.subtitle_ru}
                onChange={(e) => handleInputChange(e)}
              />
              {err?.subtitle_ru && (
                <span className="errorSpan">
                  {translate("Enter subtitle in russian")}
                </span>
              )}
            </div>
          </div>
          <div className="form__sections">
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
              {err?.image && (
                <span className="errorSpan">{translate("Submit image")}</span>
              )}
            </div>
            <div className="form__sections-section">
              <label htmlFor="video">{translate("Submit video")}</label>
              <input
                type="text"
                id="video"
                className={err?.video ? "error" : "input-default"}
                name="video"
                value={data.video}
                onChange={(e) => handleInputChange(e)}
              />
              {err?.video && (
                <span className="errorSpan">{translate("Link for video")}</span>
              )}
            </div>
          </div>
          <Button htmlType="submit" className="form__submit-btn" type="primary">
            {translate("Save")}
          </Button>
        </form>
      </div>
    </Drawer>
  );
};

export default AddCompanySlider;
