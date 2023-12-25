import PopupWithForm from "./PopupWithForm";
import Popup from "./Popup";

const PopupConfirm = ({ onCardDelete, isOpen, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onCardDelete()
  };

  if (!isOpen) {
    return null;
  }
  return (
    <Popup onClose={onClose}>
      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        buttonTitle="Да"
        onSubmit={handleSubmit}
      ></PopupWithForm>
    </Popup>
  );
};
export default PopupConfirm;
