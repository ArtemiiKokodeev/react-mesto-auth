import { apiConfig } from './constants';

export class Api {
    constructor({url, headers}) {
      this._url = url;
      this._headers = headers;
    }

    // Проверка ответа от сервера
    _checkServerResponse(res) {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    }

    // Получить список всех карточек в виде массива (GET)
    getInitialCards() {
      return fetch(`${this._url}cards`, {
        headers: this._headers
      })
      .then(this._checkServerResponse)
    }

    // Получить данные пользователя (GET)
    getProfileInfo() {
      return fetch(`${this._url}users/me`, {
        headers: this._headers
      })
      .then(this._checkServerResponse)
    }

    // Заменить данные пользователя (PATCH)
    editProfileInfo(userInfo) {
      return fetch(`${this._url}users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(userInfo)
      })
      .then(this._checkServerResponse)
    }

    // Добавить карточку (POST)
    addNewCard(cardInfo) {
      return fetch(`${this._url}cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(cardInfo)
      })
      .then(this._checkServerResponse)
    }

    // Удалить карточку (DELETE)
    deleteCard(id) {
      return fetch(`${this._url}cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._checkServerResponse)
    }

    // Поставить или убрать лайк карточки (PUT/DELETE)
    changeLikeCardStatus(id, isLiked) {
      if (isLiked) {
        return fetch(`${this._url}cards/${id}/likes`, {
          method: 'PUT',
          headers: this._headers
        })
        .then(this._checkServerResponse)
      } else {
          return fetch(`${this._url}cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkServerResponse)
      }
    }

    // Заменить аватар (PATCH)
    editAvatar(avatarLink) {
      return fetch(`${this._url}users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(avatarLink)
      })
      .then(this._checkServerResponse)
    }
  }

export const apiNew = new Api(apiConfig);