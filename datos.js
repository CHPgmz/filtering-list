const input = document.querySelector("#searchInput"); //Selecciona el campo input
const userList = document.querySelector("#users"); //Selecciona la etiqueta ul
let users = [];

window.addEventListener("DOMContentLoaded", async () => {
  userList.innerHTML = "<h1>Cargando datos...</h1>";
  const data = await getUsers();

  users = data.data;
  //console.log(data.data);
  renderUsers(users);
});

async function getUsers() {
  const result = await fetch("https://fakerapi.it/api/v1/users?_quantity=400"); //Obtiene los datos desde la api

  return await result.json(); //Convierte los datos en JSON, y lo retorna
  //console.log(data.data);
}

input.addEventListener("keyup", (e) => {
  //console.log(input.value);
  const newUsers = users.filter((user) =>
    `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`.includes(
      input.value.toLowerCase()
    )
  );
  renderUsers(newUsers);
});

const usersItems = (users) =>
  users.map((user) => `<li>${user.firstname} ${user.lastname}</li>`).join(" "); //Imprime los datos en un li y lo concatena con un join

function renderUsers(users) {
  //Funcion para renderisar los ususarios
  const itemsString = usersItems(users); //Llama a la funcion userList y le pasa el areglo
  userList.innerHTML = itemsString; //Imprime los datos en un ul
}
