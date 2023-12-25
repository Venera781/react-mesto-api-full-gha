import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PageForm = ({ name, title, buttonTitle, actionFunction, path }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    actionFunction({ email, password }, () => {
      setEmail("");
      setPassword("");
      navigate(path);
    }, (err) => {
      if (!("status" in err)) {
        setMessage("Не удалось зарегистрироваться");
      } else if (err.status === 400) {
        setMessage("Неверно введены данные");
      }
    })
  }

  return (
    <>
      <form className="pageform" name={name} onSubmit={handleSubmit} noValidate>
        <h3 className="popup__heading pageform__heading">{title}</h3>
        <input
          className="popup__input pageform__input"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);
          }}
          required
        />
        <span className="email-error popup__input-error popup__input-error_last"></span>
        <input
          className="popup__input pageform__input"
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
          required
        />
        <span className="email-error popup__input-error popup__input-error_last"></span>
        <button
          className="popup__submit-button pageform__submit-button"
          type="submit"
        >
          {buttonTitle}
        </button>
      </form>
      {message && <p className="register-error">{message}</p>}
    </>
  );
};
export default PageForm;
