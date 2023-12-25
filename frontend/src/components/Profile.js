import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";

const Profile = ({ onEditProfile, onEditAvatar, onOpenAddImage }) => {
  const { avatar, name, about } = useContext(CurrentUserContext);

  return (
    <section className="profile">
      <div className="profile__avatar-wrapper" onClick={onEditAvatar}>
        <img className="profile__avatar" src={avatar} alt={`Фото ${name}`} />
      </div>
      <div className="profile__info">
        <div className="profile__wrapper">
          <h1 className="profile__name">{name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            aria-label="Редактировать"
            onClick={onEditProfile}
          />
        </div>
        <p className="profile__profession">{about}</p>
      </div>
      <button
        className="profile__add-button"
        type="button"
        aria-label="Добавить фото"
        onClick={onOpenAddImage}
      ></button>
    </section>
  );
};
export default Profile;
