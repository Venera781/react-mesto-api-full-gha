import { useRef, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Popup from "./Popup";

const EditAvatarPopup = ({ onUpdateAvatar, isOpen, onClose }) => {
  const currentUser = useContext(CurrentUserContext);
  const linkInput = useRef();

  useEffect(() => {
    if (!linkInput.current) {
      return;
    }
    linkInput.current.value = currentUser.avatar;
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(linkInput.current.value);
  }
  if (!isOpen) {
    return null;
  }
  return (
    <Popup onClose={onClose}>
      <PopupWithForm
        name="update"
        title="Обновить аватар"
        buttonTitle="Сохранить"
        onSubmit={handleSubmit}
      >
        <input
          className="popup__input"
          type="url"
          id="avatar"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
          ref={linkInput}
        />
        <span className="avatar-error popup__input-error popup__input-error_last"></span>
      </PopupWithForm>
    </Popup>
  );
};
export default EditAvatarPopup;
