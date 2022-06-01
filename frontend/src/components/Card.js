import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = card.likes.some((item) => {
    return item === currentUser._id;
  });

  const cardLikeButtonClassName = `${
    isLiked ? "element__like element__like_active" : "element__like"
  }`;

  const isOwn = card.owner === currentUser._id;

  const cardDeleteButtonClassName = `${
    isOwn ? "element__delete element__delete_active" : "element__delete"
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <img
        onClick={handleCardClick}
        src={card.link}
        alt={card.name}
        className="element__img"
      />
      <div className="element__signature">
        <h2 className="element__caption">{card.name}</h2>
        <div className="element__button">
          <button
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
            type="button"
            aria-label="лайк"
          ></button>
          <p className="element__counter">{card.likes.length}</p>
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
