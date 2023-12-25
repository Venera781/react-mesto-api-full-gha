import {getToken} from "./token";

class Api {
  constructor() {
    this._baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.BACKEND_URL
        : "http://127.0.0.1:3000";
  }

  static _getHeaders(needAuth = true) {
    const rv = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (needAuth) {
      rv.Authorization = `Bearer ${getToken()}`;
    }
    return rv;
  }

  _getData(path) {
    return fetch(`${this._baseUrl}/${path}`, {
      method: "GET",
      headers: Api._getHeaders(),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
  }

  // получить список всех карточек в виде массива
  getInitialCards() {
    return this._getData("cards").then((cards) => {
      cards.reverse();
      return cards;
    });
  }

  //получить данные пользователя
  getInfoUser() {
    return this._getData("users/me").then(this._normalizeUser);
  }

  _normalizeUser = (data) => {
    return {
      name: data.name,
      about: data.about,
      avatar: data.avatar,
      id: data._id,
    };
  };

  _sendData(path, method, body, needAuth = true) {
    return fetch(`${this._baseUrl}/${path}`, {
      method: method,
      headers: Api._getHeaders(needAuth),
      body: body ? JSON.stringify(body) : undefined,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
  }

  //добавить карточку
  addCard(placename, link) {
    return this._sendData("cards", "POST", { name: placename, link: link });
  }

  //заменить данные пользователя
  editProfile(name, about) {
    return this._sendData("users/me", "PATCH", { name, about }).then(
      this._normalizeUser
    );
  }

  //удалить карточку (DELETE)
  deleteCard(id) {
    return this._sendData(`cards/${id}`, "DELETE");
  }

  //заменить аватар (PATCH)
  async updateAvatar(avatar) {
    const data = await this._sendData("users/me/avatar", "PATCH", {
      avatar: avatar,
    });
    return this._normalizeUser(data);
  }

  //Ставить/удалить лайк карточки (DELETE)
  toggleLikes(id, alreadyLiked) {
    if (alreadyLiked) {
      return this._sendData(`cards/${id}/likes`, "DELETE");
    }
    return this._sendData(`cards/${id}/likes`, "PUT");
  }

  register(email, password) {
    return this._sendData("signup", "POST", { email, password }, false);
  }

  authorize(email, password) {
    return this._sendData("signin", "POST", { email, password }, false);
  }
}

const api = new Api();

export default api;
