
const nome = document.getElementById("nome")
const email = document.getElementById("email")
const id = document.getElementById("id")


async function getList() {
  const response = await fetch("https://xp41-soundgarden-api.herokuapp.com/bookings", {
    method: "GET",
  });
  const reserveList = await response.json();

  reserveList.forEach((reserve) => {


    const name =`<td> ${reserve.owner_name}</td><br>`;
  
    nome.innerHTML += name;
  
    const emmail = `<td>${reserve.owner_email}</td><br>`;

    email.innerHTML += emmail;

    const idd = `<td> ${reserve._id} </td><br>`

    id.innerHTML += idd;
  });
}
getList();


