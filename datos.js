const input = document.querySelector("#searchInput"); //Selecciona el campo input por su id
const userList = document.querySelector("#users"); //Selecciona la etiqueta ul por su id
let users = [];

window.addEventListener("DOMContentLoaded", async () => {
  userList.innerHTML = "<h1>Cargando datos...</h1>";

  const data = await getUsers();
  users = data.data;

  renderUsers(users);
});

input.addEventListener("keyup", (e) => {
  //console.log(input.value);
  const newUsers = users.filter((user) =>
    `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`.includes(
      input.value.toLowerCase()
    )
  );
  renderUsers(newUsers);
});
async function getUsers() {
  const result = await fetch("https://fakerapi.it/api/v1/users?_quantity=600"); //obtiene los datos desde esta api
  return await result.json();
}

//imprime los usuarios usando el metodo map
const itemsUsers = (users) =>
  users.map((user) => `<li>${user.firstname} ${user.lastname}</li>`).join(" ");

function renderUsers(users) {
  const items = itemsUsers(users);
  userList.innerHTML = items;
}
