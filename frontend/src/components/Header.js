import React from "react";
import logo from "../images/logo.svg";
import { NavLink, useLocation } from "react-router-dom";

function Header(props) {
  const location = useLocation();
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  function handleToggleMenu() {
    setMenuIsOpen(!menuIsOpen);
  }

  function handleSignOut() {
    setMenuIsOpen(false);
    props.onSignOut();
  }
  return (
    <header
      className={props.loggedIn ? "header header__row-reverse" : "header"}
    >
      {props.loggedIn && (
        <div
          className={
            menuIsOpen
              ? "header__container header__container_opened"
              : "header__container"
          }
        >
          <address className="header__address">
            {props.email && props.email}
          </address>
          <button
            className="header__button"
            type="button"
            onClick={handleSignOut}
          >
            Выйти
          </button>
        </div>
      )}
      <div className="header__container-main">
        <img
          className={menuIsOpen ? "header__logo_opened" : "header__logo"}
          src={logo}
          alt="логотип сайта"
        />
        {props.loggedIn && (
          <button
            className={
              menuIsOpen
                ? "header__menu-button header__menu-button_opened"
                : "header__menu-button"
            }
            type="button"
            aria-label="кнопка меню"
            onClick={handleToggleMenu}
          />
        )}
        {!props.loggedIn && (
          <nav>
            {location.pathname === "/sign-in" && (
              <NavLink className="header__navlink" to="/sign-up">
                Регистрация
              </NavLink>
            )}
            {location.pathname === "/sign-up" && (
              <NavLink className="header__navlink" to="/sign-in">
                Войти
              </NavLink>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
