import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardDeleteButtonClassName = `${
    isOwn ? "element__delete element__delete_active" : "element__delete"
  }`;
  const cardLikeButtonClassName = `${
    isLiked ? "element__like element__like_active" : "element__like"
  }`;

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleCardLike() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      <img
        onClick={handleCardClick}
        src={props.card.link}
        alt={props.card.name}
        className="element__img"
      />
      <div className="element__signature">
        <h2 className="element__caption">{props.card.name}</h2>
        <div className="element__button">
          <button
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
            type="button"
            aria-label="лайк"
          ></button>
          <p className="element__counter">{props.card.likes.length}</p>
        </div>
        <button
          className={cardDeleteButtonClassName}
          onClick={handleCardDelete}
          type="button"
          aria-label="удалить"
        ></button>
      </div>
    </article>
  );
}

export default Card;
