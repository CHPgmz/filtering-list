const input = document.querySelector("#searchInput");
const userList = document.querySelector("#users");
let users = [];

window.addEventListener("DOMContentLoaded", async () => {
  userList.innerHTML = "<h1>Cargando datos...</h1>";
  const data = await getUsers();

  users = data.data;
  //console.log(data.data);
  renderUsers(users);
});

async function getUsers() {
  const result = await fetch("https://fakerapi.it/api/v1/users?_quantity=400");

  return await result.json();
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
  users.map((user) => `<li>${user.firstname} ${user.lastname}</li>`).join(" ");

function renderUsers(users) {
  const itemsString = usersItems(users);
  userList.innerHTML = itemsString;
}
