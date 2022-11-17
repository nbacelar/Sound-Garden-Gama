//váriavel auxiliar usada para armazenar opções utilizada no método fetch
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

//função que lista três eventos na página inicial
async function proximosEventos() {
    return await fetch("https://xp41-soundgarden-api.herokuapp.com/events", requestOptions)
    .then(
      response => {
        response.json()
        .then( data => {
          console.log(data);
          const eventos = [];
          let index = 3;
          console.log(eventos);
          while(index--){
            eventos.push(data[Math.floor(Math.random() * data.length)]);
          }
          console.log(eventos);
          const indexEventos = eventos
          .map((evento) =>  
            `<article class="evento card p-5 m-3">
              <h2>${evento.name} - ${evento.scheduled.slice(0,10).split("-").reverse().join("/")}</h2>
              <h4>${evento.attractions}</h4>
              <p>
                ${evento.description}
              </p>
              <a href="#" id="${evento._id}" class="btn btn-primary reservaIngresso">reservar ingresso</a>
            </article>`   
          );
          document.getElementById('eventos').innerHTML = indexEventos;
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
    
}

//função de reserva do ingresso
function reservarIngresso(e) {
  e.preventDefault();
  console.log("reservarIngresso");
}

//dispara a função proximosEventos enquanto a página é carregada
window.addEventListener('load', event => {
  proximosEventos();
});

//Quando a página estiver carregada, associa o evento que dispara a função reservarIngresso no click do botão 'reservar ingresso'
window.onload = (event) => {
  setTimeout(() => {
    const eventos = document.getElementsByClassName('reservaIngresso');
    for(let i=0; i<eventos.length; i++){
      eventos.item(i).addEventListener("click", reservarIngresso, false);
    }
  }, 1000);
};