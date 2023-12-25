import Popup from "./Popup";

const InfoTooltip = ({ icon, infotext, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <Popup onClose={onClose}>
      <div className="pageform__popup">
        <div className={`pageform__image ${icon}`}></div>
        <p className="pageform__infotext">{infotext}</p>
      </div>
    </Popup>
  );
};
export default InfoTooltip;
