class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getData(path) {
    return fetch(`${this._baseUrl}/${path}`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
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

  _sendData(path, method, body) {
    return fetch(`${this._baseUrl}/${path}`, {
      method: method,
      headers: this._headers,
      body: body ? JSON.stringify(body) : undefined,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
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
  updateAvatar(avatar) {
    return this._sendData("users/me/avatar", "PATCH", { avatar: avatar }).then(
      this._normalizeUser
    );
  }

  //Ставить/удалить лайк карточки (DELETE)
  toggleLikes(id, alreadyLiked) {
    if (alreadyLiked) {
      return this._sendData(`cards/${id}/likes`, "DELETE");
    }
    return this._sendData(`cards/${id}/likes`, "PUT");
  }
}

const optionsApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-75",
  headers: {
    authorization: "bf52e809-820b-4544-9ff1-1e4a5136ff57",
    "Content-Type": "application/json",
  },
};

//1.Загрузка первоначальных карточек с сервера
const api = new Api(optionsApi);

export default api;
