var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const nome = document.getElementById("nome")
const email = document.getElementById("email")
const id = document.getElementById("id")


async function getList() {
  const response = await fetch("https://xp41-soundgarden-api.herokuapp.com/bookings", {
    method: "GET",
  });
  const reserveList = await response.json();
  reserveList.forEach((reserve) => {
    const name =`<td>${reserve.owner_name}</td><br>`;
    nome.innerHTML += name;
    const emmail = `<td>${reserve.owner_email}</td><br>`;
    email.innerHTML += emmail;
    const idd = `<td> ${reserve._id} </td><br>`
    id.innerHTML += idd;
  });
}

async function reservaEvento(evento_id){
  try {
    const response = await fetch("https://xp41-soundgarden-api.herokuapp.com/bookings/event/" + 
    evento_id,
    requestOptions);
    const evento_reservas = await response.json();
    if(!evento_reservas){
      const lista_vazia = `<div>Não há reservas feitas para esse evento.</div>`;
      document.getElementById('container-tabela').innerHTML = lista_vazia;
    }
    else {
      evento_reservas.forEach((reserve) => {
        const name =`<td> ${reserve.owner_name}</td><br>`;
        nome.innerHTML += name;
        const emmail = `<td>${reserve.owner_email}</td><br>`;
        email.innerHTML += emmail;
        const idd = `<td> ${reserve._id} </td><br>`
        id.innerHTML += idd;
      });
    }
  } catch (error) {
    
  }
}

window.addEventListener('load', event => {
  const params = new URLSearchParams(window.location.search);
  const evento_id = params.get('id');
  if(evento_id){
    reservaEvento(evento_id);
  } else{
    getList();
  }
});
