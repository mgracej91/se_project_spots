class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this.checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this.checkResponse);
  }
  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: { ...this._headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this.checkResponse);
  }
  newCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: { ...this._headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this.checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: { ...this._headers, "Content-Type": "application/json" },
    }).then(this.checkResponse);
  }

  likeStatus(id, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: method,
      headers: this._headers,
    }).then(this.checkResponse);
  }

  newAvatar(avatar) {
    console.log("Sending to API:", avatar);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: { ...this._headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        avatar,
      }),
    }).then(this.checkResponse);
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}
export default Api;
