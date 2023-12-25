const PopupWithForm = ({ name, title, children, buttonTitle, onSubmit }) => {
  return (
    <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
      <h3 className="popup__heading">{title}</h3>
      {children}
      <button className="popup__submit-button" type="submit">
        {buttonTitle}
      </button>
    </form>
  );
};
export default PopupWithForm;
