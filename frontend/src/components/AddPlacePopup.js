import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import Popup from "./Popup";

const AddPlacePopup = ({ onAddPlace, isOpen, onClose }) => {
  const [namePlace, setNamePlace] = useState("");
  const [linkPlace, setLinkPlace] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setNamePlace("");
      setLinkPlace("");
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(namePlace, linkPlace);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <Popup onClose={onClose}>
      <PopupWithForm
        name="addimage"
        title="Новое место"
        buttonTitle="Сохранить"
        onSubmit={handleSubmit}
      >
        <input
          className="popup__input"
          type="text"
          id="placename"
          name="placename"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={namePlace}
          onChange={(evt) => setNamePlace(evt.target.value)}
        />
        <span className="placename-error popup__input-error">
          Вы пропустили это поле.
        </span>
        <input
          className="popup__input"
          type="url"
          id="link"
          name="link"
          placeholder="Ссылка на картинку"
          value={linkPlace}
          required
          onChange={(evt) => setLinkPlace(evt.target.value)}
        />
        <span className="link-error popup__input-error popup__input-error_last">
          Введите адрес сайта.
        </span>
      </PopupWithForm>
    </Popup>
  );
};

export default AddPlacePopup;
