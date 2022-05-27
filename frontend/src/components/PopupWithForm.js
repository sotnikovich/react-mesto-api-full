import React from "react";

function PopupWithForm(props) {
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
      className={`modal modal-${props.name} ${props.isOpen && "modal_active"}`}
    >
      <div className="modal__inner">
        <h2 className="modal__title">{props.title}</h2>
        <button
          className="modal__close"
          type="button"
          aria-label="закрытие попап"
          onClick={props.onClose}
        ></button>
        <form className="form" name={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <button className="modal__submit" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
