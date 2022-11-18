//váriavel auxiliar usada para armazenar opções utilizada no método fetch 
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

//função que carrega as linhas da tabela de eventos
async function adminPainel() {
  try {
    const response = await fetch("https://xp41-soundgarden-api.herokuapp.com/events", requestOptions);
    const data = await response.json();
    const eventos = data
      .map((linhaEvento, index) =>  
        `<tr>
          <th scope="row">${(index+1)}</th>
          <td>${linhaEvento.scheduled.slice(0,10).split("-").reverse().join("/")}</td>
          <td>${linhaEvento.name}</td>
          <td>${linhaEvento.attractions}</td>
          <td>
              <a href="Lista-de-reservas.html?id=${linhaEvento._id}" id="reserva" class="btn btn-dark reserva">ver reservas</a>
              <a href="editar-evento.html?id=${linhaEvento._id}"  id="editar" class="btn btn-secondary editar">editar</a>
              <a href="excluir-evento.html?id=${linhaEvento._id}" id="excluir" class="btn btn-danger excluir">excluir</a>
          </td>
        </tr>`   
      );
      
    document.getElementById('tabela').innerHTML = eventos;

  } catch (error) {
    console.log('Fetch Error :-S', error);
  }
}

//função do botão 'ver reserva'
function verReserva(e) {
}

//função do botão 'editar reserva'
function editarReserva(e) {
}

//função do botão 'excluir reserva'
function excluirReserva(e) {
}

//dispara a função adminPainel enquanto a página é carregada
window.addEventListener('load', event => {
  adminPainel();
});

//Quando a página estiver carregada, associa os eventos verReserva, editarReserva e excluirReserva aos seus botões
window.onload = (event) => {
  setTimeout(() => {
      const reserva_btn = document.getElementById('reserva');
      const editar_btn = document.getElementById('editar');
      const excluir_btn = document.getElementById('excluir');
      for(let i=0; i<reserva_btn.length; i++){
        reserva_btn.item(i).addEventListener('click', verReserva, false);
        editar_btn.item(i).addEventListener('click', editarReserva, false);
        excluir_btn.item(i).addEventListener('click', excluirReserva, false);
      }
  }, 1000);
};
