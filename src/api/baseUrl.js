export default function getBaseUrl() {
  //const inDevelopment = window.location.hostname === "localhost";
  //return inDevelopment ? "http://localhost:3001/" : "/"; // dev : production
  return getQueryStringParameterByName("useMockApi")
    ? "http://localhost:3001/"
    : "https://sheltered-bastion-82899.herokuapp.com/"; // real api hosted by express
}

// plain JS to get single parameter
function getQueryStringParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
