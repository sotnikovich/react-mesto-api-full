import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup(props) {
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={props.onSubmit}
      name="confirm"
      title="Вы уверены?"
      buttonText="Да"
    />
  );
}

export default ConfirmPopup;
