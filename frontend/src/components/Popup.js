import { useEffect } from "react";
import cx from "../utils/cx";

const Popup = ({ children, onClose, isDark }) => {
  const handleClickOverlay = (evt) => {
    const clickEl = evt.target;
    if (!clickEl.closest(".popup__container")) {
      onClose();
    }
  };
  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscClose);

    return () => {
      window.removeEventListener("keydown", handleEscClose);
    };
  }, [onClose]);

  return (
    <div
      className={cx("popup", "popup_opened", isDark && "popup_dark")}
      onClick={handleClickOverlay}
    >
      <div className="popup__container">
        {children}
        <button
          onClick={onClose}
          className="popup__button popup__close-btn"
          type="button"
        ></button>
      </div>
    </div>
  );
};
export default Popup;
