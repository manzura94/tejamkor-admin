import React, { useState, useEffect } from "react";
import { Button, Drawer } from "antd";
import { Telegram, Instagram, Facebook, Youtube } from "../Components/icons";
import ImageUpload from "./ImageUpload";
import { authHost } from "../utils/https";
import { company } from "../utils/urls";
import useLanguage from "../utils/useLanguage";

const initial = {
  name: "",
  name_ru: "",
  logo: "",
  companyFeatureTitle: "",
  companyFeatureSubTitle: "",
  address: "",
  address_ru: "",
  phone: "",
  instagram: "",
  facebook: "",
  telegram: "",
  youtube: "",
  counts: "string",
};

const inputErrors = {
  name: false,
  name_ru: false,
  logo: false,
  companyFeatureTitle: false,
  companyFeatureSubTitle: false,
  address: false,
  address_ru: false,
  phone: false,
  instagram: false,
  facebook: false,
  telegram: false,
  youtube: false,
};

const CompanyDrawer = ({
  open,
  setOpen,
  fetchCompany,
  isEditing,
  setIsEditing,
  selectCompany,
  setSelectCompany,
}) => {
  const [data, setData] = useState(initial);
  const [fileList, setFileList] = useState([]);
  const [err, setErr] = useState(inputErrors);
  const translate = useLanguage();

  const onClose = () => {
    setOpen(false);
    setIsEditing(false);
    setData(initial);
    setSelectCompany(0);
    setFileList([]);
    setErr(inputErrors)
  };

  const validate = (name, value) => {
    let cloneError = { ...err };
    if (value.length == 0) {
      cloneError[name] = true;
    } else {
      cloneError[name] = false;
    }
    setErr(cloneError);
  };

  const onChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    validate(name, value);
    setData({ ...data, [name]: value });
  };

  const onAddSubmit = async () => {
    const res = await authHost.post(`${company}`, data);
    console.log(res.data);
    fetchCompany();
    setData(res.data);
    setOpen(false);
    setFileList([]);
    setData(initial);
  };

  const onEditSubmit = async () => {
    let id = selectCompany.id;
    const res = await authHost.patch(`${company}/${id}`, data);
    console.log(res.data);
    setData(res.data.data);
    fetchCompany();
    setOpen(false);
    setFileList([]);
    setSelectCompany(0);
    setIsEditing(false);
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
      isEditing ? onEditSubmit() : onAddSubmit();
    }
  };

  useEffect(() => {
    if (selectCompany) {
      setData(selectCompany);
    }
  }, [selectCompany]);

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
              <label htmlFor="name">{translate("Company Name")}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={(e) => onChange(e)}
                className={err?.name ? "error" : "input-default"}
              />
              {err?.name && <span className= "errorSpan">
                {translate("Enter Company Name")}
              </span>}
            </div>
            <div className="form__sections-section">
              <label htmlFor="name_ru">
                {translate("Company Name in russian")}
              </label>
              <input
                type="text"
                id="name_ru"
                name="name_ru"
                value={data.name_ru}
                onChange={(e) => onChange(e)}
                className={err?.name_ru ? "error" : "input-default"}
              />
               {err?.name_ru && <span className= "errorSpan">
                {translate("Enter Company Name in russian")}
              </span>}
            </div>
          </div>
          <div className="form__sections">
            <div className="form__sections-section">
              <label htmlFor="title">{translate("Title")}</label>
              <input
                type="text"
                id="title"
                name="companyFeatureTitle"
                value={data.companyFeatureTitle}
                onChange={(e) => onChange(e)}
                className={err?.companyFeatureTitle ? "error" : "input-default"}
              />
              {err?.companyFeatureTitle && <span className= "errorSpan">
                {translate("Enter title")}
              </span>}
            </div>
            <div className="form__sections-section">
              <label htmlFor="subtitle">{translate("Subtitle")}</label>
              <input
                type="text"
                id="subtitle"
                name="companyFeatureSubTitle"
                value={data.companyFeatureSubTitle}
                onChange={(e) => onChange(e)}
                className={
                  err?.companyFeatureSubTitle ? "error" : "input-default"
                }
              />
              {err?.companyFeatureSubTitle && <span className= "errorSpan">
                {translate("Enter subtitle")}
              </span>}
            </div>
          </div>
          <div className="form__sections">
            <div className="form__sections-section">
              <label htmlFor="address">{translate("Address")}</label>
              <input
                type="text"
                name="address"
                value={data.address}
                onChange={(e) => onChange(e)}
                className={err?.address ? "error" : "input-default"}
              />
              {err?.address && <span className= "errorSpan">
                {translate("Enter address")}
              </span>}
            </div>
            <div className="form__sections-section">
              <label htmlFor="address_ru">
                {translate("Address in russian")}
              </label>
              <input
                type="text"
                name="address_ru"
                value={data.address_ru}
                onChange={(e) => onChange(e)}
                className={err?.address_ru ? "error" : "input-default"}
              />
              {err?.address_ru && <span className= "errorSpan">
                {translate("Enter address in russian")}
              </span>}
            </div>
          </div>
          <div className="form__image-cont">
            <label htmlFor="image">{translate("Image")}</label>
            <ImageUpload
              jsonData={data}
              setJsonData={setData}
              name="logo"
              fileList={fileList}
              setFileList={setFileList}
              validate={validate}
              err={err}
            />
            {err?.logo && <span className= "errorSpan">
                {translate("Submit image")}
              </span>}
          </div>
          <div className="form__sections network__section">
            <div className="form__sections-section">
              <span className="form-logo">
                <img src={Instagram} alt="instagram-logo" />
              </span>
              <input
                type="text"
                name="instagram"
                value={data.instagram}
                onChange={(e) => onChange(e)}
                className={err?.instagram ? "error" : "input-default"}
              />
              {err?.instagram && <span className= "errorSpan">
                {translate("Your instagram")}
              </span>}
            </div>
            <div className="form__sections-section">
              <span className="form-logo">
                <img src={Facebook} alt="facebook-logo" />
              </span>
              <input
                type="text"
                name="facebook"
                value={data.facebook}
                onChange={(e) => onChange(e)}
                className={err?.facebook ? "error" : "input-default"}
              />
              {err?.facebook && <span className= "errorSpan">
                {translate("Your facebook")}
              </span>}
            </div>
          </div>
          <div className="form__sections">
            <div className="form__sections-section">
              <span className="form-logo">
                <img src={Telegram} alt="telegram-logo" />
              </span>
              <input
                type="text"
                name="telegram"
                value={data.telegram}
                onChange={(e) => onChange(e)}
                className={err?.telegram ? "error" : "input-default"}
              />
              {err?.telegram && <span className= "errorSpan">
                {translate("Your telegram")}
              </span>}
            </div>
            <div className="form__sections-section">
              <span className="form-logo">
                <img src={Youtube} alt="youtube-logo" />
              </span>
              <input
                type="text"
                name="youtube"
                value={data.youtube}
                onChange={(e) => onChange(e)}
                className={err?.youtube ? "error" : "input-default"}
              />
              {err?.youtube && <span className= "errorSpan">
                {translate("Your youtube")}
              </span>}
            </div>
          </div>
          <div className="form__sections-section form-phone-number">
            <label htmlFor="phone">{translate("Your phone number")}</label>
            <input
              type="tel"
              placeholder="+998 90 060 0665"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              required
              name="phone"
              value={data.phone}
              onChange={(e) => onChange(e)}
              className={err?.phone ? "error" : "input-default"}
            />
            {err?.phone && <span className= "errorSpan">
                {translate("Your phone number")}
              </span>}
          </div>
          <Button
            type="primary"
            onClick={(e) => onSubmit(e)}
            className="form__submit-btn"
          >
            {translate("Save")}
          </Button>
        </form>
      </div>
    </Drawer>
  );
};

export default CompanyDrawer;
