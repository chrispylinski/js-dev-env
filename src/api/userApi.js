import "whatwg-fetch"; // what working group fetch: this ensures that fetch run in browsers that don't support it natively

// public function
export function getUsers() {
  return get("users");
}

// all functions below are private
function get(url) {
  return fetch(url).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  return console.log(error); // eslint-disable-line no-console
}
