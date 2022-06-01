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
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": this._headers.contentType,
      },
      credentials: "include",
    }).then((res) => this._checkResult(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": this._headers.contentType,
      },
      credentials: "include",
    }).then((res) => this._checkResult(res));
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": this._headers.contentType,
      },
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkResult(res));
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": this._headers.contentType,
      },
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkResult(res));
  }

  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data}`, {
      method: "DELETE",
      headers: {
        "Content-Type": this._headers.contentType,
      },
      credentials: "include",
    }).then((res) => this._checkResult(res));
  }

  handleLike(item, like) {
    return fetch(`${this._baseUrl}/cards/${item}/likes`, {
      method: like ? "DELETE" : "PUT",
      headers: {
        "Content-Type": this._headers.contentType,
      },
      credentials: "include",
    }).then((res) => this._checkResult(res));
  }

  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": this._headers.contentType,
      },
      credentials: "include",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkResult(res));
  }
}

const api = new Api({
  baseUrl: "https://api.felaw.mesto.nomoreparties.sbs",
  headers: {
    contentType: "application/json",
  },
});

export default api;
