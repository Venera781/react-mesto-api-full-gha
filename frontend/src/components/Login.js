import PageForm from "./PageForm";
import Header from "./Header";

const Login = ({ onLogin }) => {
  return (
    <>
      <Header />
      <PageForm
        name="sign-in"
        title="Вход"
        buttonTitle="Войти"
        actionFunction={onLogin}
        path="/"
      >
        <span className="email-error popup__input-error popup__input-error_last"></span>
      </PageForm>
    </>
  );
};
export default Login;
