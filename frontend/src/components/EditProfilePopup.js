import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [values, setValues] = React.useState({ name: "", about: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  React.useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about });
  }, [props.isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="modal__input"
        id="nameInput"
        name="name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        autoComplete="off"
        value={values.name || ''}
        onChange={handleChange}
      />
      <span className="modal__error" id="nameInputError"></span>
      <input
        className="modal__input"
        id="jobInput"
        name="about"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        autoComplete="off"
        value={values.about || ''}
        onChange={handleChange}
      />
      <span className="modal__error" id="jobInputError"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
