import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avaInput"
        type="url"
        className="modal__input"
        name="avatar"
        required
        autoComplete="off"
        ref={avatarRef}
        placeholder="Ссылка на аватар"
      />
      <span className="modal__error" id="avaInputError"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
