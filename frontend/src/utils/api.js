class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResult(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
    }).then((res) => this._checkResult(res));
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkResult(res));
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkResult(res));
  }

  deleteCard(data) {
    return fetch(`${this._baseUrl}cards/${data}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResult(res));
  }

  setLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResult(res));
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.deleteLike(id);
    } else {
      return this.setLike(id);
    }
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResult(res));
  }

  setUserAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkResult(res));
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort36/",
  headers: {
    authorization: "8c8ed8aa-4046-4be0-b3e7-9f814b718ab1",
    "Content-Type": "application/json",
  },
});

export default api;
