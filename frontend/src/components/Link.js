import style from "./Link.module.css";

const Link = ({ href, title, onClick }) => {
  return (
    <a onClick={onClick} className={style.headerlink} href={href}>
      {title}
    </a>
  );
};
export default Link;
