import Cookies from "universal-cookie";
const cookies = new Cookies();

const API = "http://localhost:4000";

export const login = (credentials) => {
  return fetch(`${API}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then(async (response) => {
      var data = await response.json();
      cookies.set("user", data.resObject);
      cookies.set("token", data.token);
      return data;
    })
    .catch((err) => console.log(err));
};

export const signup = (credentials) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProduct = (product) => {
  //   console.log(product.get("qrcode"));
  let auth = isAuthenticated();
  return fetch(`${API}/product`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth ? auth.token : ""}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const isAuthenticated = () => {
  if (cookies.get("user"))
    return { user: cookies.get("user"), token: cookies.get("token") };
  return null;
};
