const baseUrl = "http://localhost:3001";

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
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(_checkResponse);
};

function addItems(name, link, weather) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl: link,
      weather,
    }),
  }).then(_checkResponse);
}

function deleteItems(id) {
  return fetch(`${baseUrl}/items/${id}`, { 
    method: "DELETE", 
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }, })
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
  }).then(_checkResponse);
}

function dislikeCard(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(_checkResponse);
}

export { getItems, addItems, deleteItems, likeCard, dislikeCard, _checkResponse, getUserInfo };
