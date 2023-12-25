import PageForm from "./PageForm";
import Header from "./Header";
import PathName from "../utils/PathNames";

const Register = ({ onRegister }) => {
  return (
    <>
      <Header />
      <PageForm
        name="sign-up"
        title="Регистрация"
        buttonTitle="Зарегистрироваться"
        actionFunction={onRegister}
        path={PathName.login}
      ></PageForm>
      <p className="pageform__add-comment">
        Уже зарегистрированы?
        <a
          className="pageform__link"
          href={PathName.login}
          title="Cтраница для зарегистрированного пользователя"
        >
          Войти
        </a>
      </p>
    </>
  );
};
export default Register;
