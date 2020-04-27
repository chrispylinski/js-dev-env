// This is the APPS ENTRY POINT
import "./index.css";
import { getUsers, deleteUser } from "./api/userApi";

// Populate talbe of users via API call.
getUsers().then((result) => {
  let usersBody = "";

  result.forEach((user) => {
    usersBody += `<tr>
      <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
      <td>${user.id}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
      </tr>`;
  });

  global.document.getElementById("users").innerHTML = usersBody; // this will populate "users" table body in index.html

  const deleteLinks = global.document.getElementsByClassName("deleteUser");

  // Must use array.from to create a real array from a DOM collection
  // getElementsByClassname only returns an "array like" object
  Array.from(deleteLinks, (link) => {
    //debugger;
    link.onclick = function (event) {
      const element = event.target;
      event.preventDefault(); // prevent change to the URL
      deleteUser(element.attributes["data-id"].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
  });
});
