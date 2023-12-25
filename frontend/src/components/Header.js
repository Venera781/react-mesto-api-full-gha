import { useLocation } from "react-router-dom";
import { useUserEmail } from "../contexts/CurrentUserContext";
import Link from "./Link";
import { useNavigate } from "react-router-dom";
import * as token from "../utils/token";
import PathName from "../utils/PathNames.js";

function Header() {
  const email = useUserEmail();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let el;
  if (pathname === PathName.register) {
    el = <Link href={PathName.login} title="Войти" />;
  } else if (pathname === PathName.login) {
    el = <Link href={PathName.register} title="Pегистрация" />;
  } else if (pathname === "/") {
    const onExit = (e) => {
      e.preventDefault();
      token.removeToken();
      navigate(PathName.login);
    };
    el = (
      <div className="header__loggedwrapper">
        <p className="header__email">{email}</p>
        <Link onClick={onExit} href="#" title="Выйти" />
      </div>
    );
  }

  return (
    <header className="header">
      <div className="header__logo"></div>
      {el}
    </header>
  );
}
export default Header;
