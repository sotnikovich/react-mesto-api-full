import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
          onClick={props.onEditAvatar}
        ></div>
        <div className="profile__info">
          <div className="profile__data">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="кнопка редактирования"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="добавить профиль"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
