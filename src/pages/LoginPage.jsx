import React, { useState, useContext } from "react";
import { Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { UserContext } from "../context/Context";
import { LoadingContext } from "../context/LoadingContext";
import { authHost } from "../utils/https";
import { login } from "../utils/urls";

const inputErrors = {
  username: false,
  pwd: false,
  invalid: false,
};
const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const [username, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState(inputErrors);

  const validate = (name, value) => {
    const result =
      name === "pwd"
        ? { pwd: value.length <= 3 }
        : { username: value.length <= 4 };
    setErr({ ...err, ...result, invalid:false });
  };

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    validate(name, value);
    name === "username" ? setUserName(value) : setPwd(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = { pwd: pwd.length <= 3, username: username.length <= 4 };
    setErr({ ...err, ...result });

    if (!result.pwd && !result.username) {
      setLoading(true);
      const { data } = await authHost.post(`${login}`, { username, pwd });
      if (
        (data.code === 404 && data.error === "AUTH_FAILED_ADMIN_NOT_FOUND") ||
        (data.code === 400 && data.error === "AUTH_FAILED_WRONG_PASSWORD")
      ) {
        setErr({ ...err, invalid: true });
        setLoading(false);
        setUser(false);
      } else {
        localStorage.setItem("accessToken", data.data.tokens.accessToken);
        localStorage.setItem("refreshToken", data.data.tokens.refreshToken);
        localStorage.setItem("id", data.data.id);
        localStorage.setItem("user", true);
        window.location = "/";
        setUser(true);
        setLoading(false);
      }
    }
  };
  return (
    <div className="form-wrapper">
      <form className="loginForm">
        {err?.invalid && (
          <div className="loginForm__error-section">
            <QuestionCircleOutlined
              style={{
                color: "red",
              }}
            />
            <p>Login yoki parol xato</p>
          </div>
        )}
        <div className="loginForm__sections">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            name="username"
            value={username}
            onChange={(e) => onChange(e)}
            className={
              err?.username || err?.invalid ? "error" : "loginForm-input"
            }
          />
          {err?.username && (
            <span className="login__errorSpan">
              Foydalanuvchi nomi 5 belgidan uzun bo'lishi kerak
            </span>
          )}
        </div>
        <div className="loginForm__sections">
          <label htmlFor="password">Password</label>
          <input
            value={pwd}
            type="password"
            id="password"
            name="pwd"
            onChange={(e) => onChange(e)}
            className={err?.pwd || err?.invalid ? "error" : "loginForm-input"}
          />
          {err?.pwd && (
            <span className="login__errorSpan">
              Parol 4 ta belgidan uzun bo'lishi kerak
            </span>
          )}
        </div>
        <Button
          className="form__submit-btn from__btn"
          type="primary"
          onClick={(e) => handleSubmit(e)}
          loading={loading}
        >
          submit
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
