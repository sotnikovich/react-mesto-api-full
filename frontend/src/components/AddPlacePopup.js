import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [values, setValues] = React.useState({ name: "", link: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  React.useEffect(() => {
    setValues({ name: "", link: "" });
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault(e);
    props.onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="placeInput"
        className="modal__input"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        autoComplete="off"
        value={values.name}
        onChange={handleChange}
      />
      <span className="modal__error" id="placeInputError"></span>
      <input
        id="linkInput"
        type="url"
        className="modal__input"
        name="link"
        placeholder="Ссылка на картинку"
        required
        autoComplete="off"
        value={values.link}
        onChange={handleChange}
      />
      <span className="modal__error" id="linkInputError"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
