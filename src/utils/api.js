const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

function _checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(_checkResponse);
}

const getUserInfo = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(_checkResponse);
};

function addItems(name, link, weather, owner) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name,
      link,
      weather,
      owner,
    })
  }).then(_checkResponse);
}

function deleteItems(id) {
  return fetch(`${baseUrl}/items/${id}`, { method: "DELETE", headers: headers })
    .then(_checkResponse)
    .then(() => console.log("Card has been deleted"));
}

function likeCard(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => processServerRequest(res));
}

function dislikeCard(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => processServerRequest(res));
}

export { getItems, addItems, deleteItems, likeCard, dislikeCard, _checkResponse, getUserInfo };
