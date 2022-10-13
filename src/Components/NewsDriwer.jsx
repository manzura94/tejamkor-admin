import React, { useState, useEffect } from "react";
import { Button, Drawer } from "antd";
import ReactQuill from "react-quill";
import ImageUpload from "../pages/ImageUpload";
import { authHost } from "../utils/https";
import { news } from "../utils/urls";
import useLanguage from "../utils/useLanguage";
import { validate } from "../utils/helpers";


const initial = {
  title: "",
  title_ru: "",
  intro: "",
  intro_ru: "",
  content: "",
  content_ru: "",
  image: "",
  author: "",
  date: "",
};

const inputErrors = {
  title: false,
  title_ru: false,
  intro: false,
  intro_ru: false,
  content: false,
  content_ru: false,
  image: false,
  author: false,
  date: false,
};

const NewsDriwer = ({
  open,
  setOpen,
  fetchNewsList,
  select,
  setSelect,
  edit,
  setEdit,
}) => {
  const translate = useLanguage();

  const [data, setData] = useState(initial);
  const [fileList, setFileList] = useState([]);
  const [err, setErr] = useState(inputErrors);

  const addNewsHandler = async () => {
    const res = await authHost.post(`${news}`, data);
    setData(res.data);
    fetchNewsList();
    setOpen(false);
    setData(initial);
  };

  const editNewsHandler = async () => {
    let id = data.id;
    const res = await authHost.patch(`${news}/${id}`, data);
    setData(res.data.data);
    fetchNewsList();
    setOpen(false);
    setData(initial);
    setEdit(false);
    setSelect(0);
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
      e.preventDefault();
      edit ? editNewsHandler() : addNewsHandler();
    }
  };

  const onClose = () => {
    setOpen(false);
    setEdit(false);
    setFileList([]);
    setSelect(0);
    setData(initial);
    setErr(inputErrors);
  };

 

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    validate(name, value,err, setErr);
    setData({
      ...data,
      [e.target.name]: e.target.value,
      content: data.content,
      content_ru: data.content_ru
    });
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
                name="title"
                id="title"
                value={data.title}
                onChange={(e) => onChange(e)}
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
                name="title_ru"
                id="title_ru"
                value={data.title_ru}
                onChange={(e) => onChange(e)}
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
              <label htmlFor="intro">{translate("Intro")}</label>
              <input
                type="text"
                name="intro"
                id="intro"
                value={data.intro}
                onChange={(e) => onChange(e)}
                className={err?.intro ? "error" : "input-default"}
              />
              {err?.intro && (
                <span className="errorSpan">{translate("Enter intro")}</span>
              )}
            </div>
            <div className="form__sections-section">
              <label htmlFor="intro_ru">{translate("Intro in russian")}</label>
              <input
                type="text"
                name="intro_ru"
                id="intro_ru"
                value={data.intro_ru}
                onChange={(e) => onChange(e)}
                className={err?.intro_ru ? "error" : "input-default"}
              />
              {err?.intro_ru && (
                <span className="errorSpan">
                  {translate("Intro in russian")}
                </span>
              )}
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
                className={err?.content ? "error" : "input-default"}
              />
              {err?.content && (
                <span className="errorSpan">{translate("Enter content")}</span>
              )}
            </div>
            <div className="form__sections-section">
              <label htmlFor="content_ru">
                {translate("Content in russian")}
              </label>
              <ReactQuill
                theme="snow"
                name="content_ru"
                value={data.content_ru}
                onChange={(newValue, deleta, source , editor) => {
                  console.log('data' , editor.getHTML());
                  if (source === "user") {
                    setData({ ...data, content_ru: editor.getHTML() });
                  }
                }}
                className={err?.content_ru ? "error" : "input-default"}
              />

              {err?.content_ru && (
                <span className="errorSpan">
                  {translate("Enter content in russian")}
                </span>
              )}
            </div>
          </div>
          <div>
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
          </div>
          <div className="form__sections">
            <div className="form__sections-section">
              <label htmlFor="author">{translate("Author")}</label>
              <input
                type="text"
                name="author"
                id="author"
                value={data.author}
                onChange={(e) => onChange(e)}
                className={err?.author ? "error" : "input-default"}
              />
              {err?.author && (
                <span className="errorSpan">{translate("Enter author")}</span>
              )}
            </div>
            <div className="form__sections-section">
              <label htmlFor="date">{translate("Date")}</label>
              <input
                type="text"
                name="date"
                id="date"
                value={data.date}
                onChange={(e) => onChange(e)}
                className={err?.date ? "error" : "input-default"}
              />
              {err?.date && (
                <span className="errorSpan">{translate("Enter date")}</span>
              )}
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

export default NewsDriwer;
