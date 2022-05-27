import { withRouter } from "react-router-dom";
import { useEffect, useState } from "react";

function Login({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [actEmail, setActEmail] = useState(false);
  const [actPass, setActPass] = useState(false);
  const [emailErr, setEmailErr] = useState("Email не может быть пустым");
  const [passErr, setPassErr] = useState("Пароль не может быть пустым");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (emailErr || passErr) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [emailErr, passErr]);

  function emailHandler(e) {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailErr("Некорректный email");
    } else {
      setEmailErr("");
    }
  }

  function passwordHandler(e) {
    setPassword(e.target.value);
    if (e.target.value.length < 4 || e.target.value.length > 16) {
      setPassErr("Пароль должен быть длиннее 4 и не более 16 символов");
      if (!e.target.value) {
        setPassErr("Пароль не может быть пустым");
      }
    } else {
      setPassErr("");
    }
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setActEmail(true);
        break;
      case "password":
        setActPass(true);
        break;
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email, password);
  }
  return (
    <div className="register">
      <h2 className="register__title">Вход</h2>
      <form className="register__container" name="form" onSubmit={handleSubmit}>
        <input
          onBlur={blurHandler}
          name="email"
          placeholder="Email"
          type="email"
          className="register__input"
          value={email}
          onChange={emailHandler}
          autoComplete="off"
          required
        />
        {actEmail && emailErr && (
          <span className="modal__error">{emailErr}</span>
        )}
        <input
          onBlur={blurHandler}
          name="password"
          placeholder="Пароль"
          type="password"
          className="register__input"
          value={password}
          onChange={passwordHandler}
          required
        />
        {actPass && passErr && <span className="modal__error">{passErr}</span>}
        <button
          type="submit"
          className={`register__button ${
            !valid && "register__button_disabled"
          }`}
        >
          Войти
        </button>
      </form>
    </div>
  );
}
export default withRouter(Login);
