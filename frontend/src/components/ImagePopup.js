import React from "react";

function ImagePopup(props) {
  React.useEffect(() => {
    function handleEscClose(e) {
      if (e.key === "Escape") {
        props.onClose();
      }
    }
    if (props.isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [props.isOpen, props.onClose]);
  return (
    <div
      className={`modal modal-img ${
        props.card && props.isOpen ? "modal_active" : ""
      }`}
    >
      <div className="modal-img__container">
        <button
          className="modal__close"
          type="button"
          aria-label="закрытие попап"
          onClick={props.onClose}
        ></button>
        <img
          className="modal__img"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="modal__caption">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
