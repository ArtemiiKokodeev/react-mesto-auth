import { BASE_URL } from "./constants";

function getResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }
  return res.json();
} 

export const register = (email, password) => {
  return fetch(`${BASE_URL}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(getResponse)
    .then((res) => {
      return res;
    })
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(getResponse)
    .then((data) => {
      return data;
    })
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(getResponse)
  .then(data => data)
}