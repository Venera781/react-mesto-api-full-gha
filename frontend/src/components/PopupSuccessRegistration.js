import InfoTooltip from "./InfoTooltip";

const PopupSuccessRegistration = ({ onClose, isOpen }) => {
  return (
    <InfoTooltip
      name="registration"
      icon="pageform__image_type_success"
      infotext="Вы успешно зарегистрировались!"
      onClose={onClose}
      isOpen={isOpen}
    />
  );
};
export default PopupSuccessRegistration;
