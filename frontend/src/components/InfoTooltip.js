import successImg from "../images/success.svg";
import failImg from "../images/fail.svg";

function InfoTooltip(props) {
  return (
    <div className={props.isOpen ? `modal modal_active` : `modal`}>
      <div className="modal__inner modal__infotool">
        <button
          className="modal__close"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          src={props.isRegSuccess ? successImg : failImg}
          className="modal__infotool-img"
          alt="успешная регистрация"
        />
        <h2 className="modal__title">
          {props.isRegSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
