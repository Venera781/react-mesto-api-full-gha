import Popup from "./Popup";

const ImagePopup = ({ data, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <Popup onClose={onClose} isDark>
      <img className="popup__image" src={data?.link} alt={data?.title} />
      <h2 className="popup__title">{data?.title}</h2>
    </Popup>
  );
};
export default ImagePopup;
