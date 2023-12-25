import InfoTooltip from "./InfoTooltip";

const PopupFailedRegistration = ({ onClose, isOpen }) => {
  return (
    <InfoTooltip
      name="registration"
      icon="pageform__image_type_failed"
      infotext="Что-то пошло не так! Попробуйте ещё раз."
      onClose={onClose}
      isOpen={isOpen}
    />
  );
};
export default PopupFailedRegistration;
