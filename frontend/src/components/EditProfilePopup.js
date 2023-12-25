import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import Popup from "./Popup";

const EditProfilePopup = ({ onUpdateUser, isOpen, onClose }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name, about);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <Popup onClose={onClose}>
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        buttonTitle="Сохранить"
        onSubmit={handleSubmit}
      >
        <input
          className="popup__input"
          type="text"
          id="name"
          name="name"
          placeholder="Имя"
          value={name}
          required
          minLength="2"
          maxLength="40"
          onChange={(evt) => {
            setName(evt.target.value);
          }}
        />
        <span className="name-error popup__input-error">
          Вы пропустили это поле.
        </span>
        <input
          className="popup__input"
          type="text"
          id="profession"
          name="profession"
          placeholder="Профессия"
          value={about}
          required
          minLength="2"
          maxLength="200"
          onChange={(evt) => {
            setAbout(evt.target.value);
          }}
        />
        <span className="profession-error popup__input-error popup__input-error_last">
          Вы пропустили это поле.
        </span>
      </PopupWithForm>
    </Popup>
  );
};

export default EditProfilePopup;
