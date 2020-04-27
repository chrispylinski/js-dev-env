import "whatwg-fetch"; // what working group fetch: this ensures that fetch run in browsers that don't support it natively
import getBaseUrl from "./baseUrl";

const baseUrl = getBaseUrl();

// public function
export function getUsers() {
  return get("users");
}

export function deleteUser(id) {
  return del(`users/${id}`);
}

// all functions below are private
function get(url) {
  return fetch(baseUrl + url).then(onSuccess, onError);
}

// can't call func delete since reserved word.
function del(url) {
  const request = new Request(baseUrl + url, {
    method: "DELETE",
  });

  return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  return console.log(error); // eslint-disable-line no-console
}
