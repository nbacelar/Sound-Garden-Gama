var requestOptions = {
  method: 'DELETE',
  redirect: 'follow'
};
  const params = new URLSearchParams(window.location.search);
  const evento_id = params.get('id');

//carrega os dados do evento nos seus respectivos campos
async function carregarValores(evento_id) {
  try {
    const response = await fetch("https://xp41-soundgarden-api.herokuapp.com/events/" + evento_id);
    const evento = await response.json();
    document.getElementById('nome').value = evento.name;
    document.getElementById('banner').value = evento.poster;
    document.getElementById('atracoes').value = evento.attractions.join(',');
    document.getElementById('descricao').value = evento.description;
    document.getElementById('data').value = evento.scheduled.slice(0,16);
    document.getElementById('lotacao').value = evento.number_tickets;

  } catch (error) {
    console.error('Error:', error);
  }
}

//função associada ao botão de enviar para edição do evento selecionado
async function excluirEvento(){
  try {
    const req = await fetch("https://xp41-soundgarden-api.herokuapp.com/events/" + 
    evento_id,
    requestOptions,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(req);
    if(req.status == 204){
      window.alert("Evento deletado com sucesso!");
      window.location.replace("admin.html");
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

//carrega o evento na página e associa a função de editarEvento ao botão
window.addEventListener('load', event => {
  document.getElementById('excluir-btn').addEventListener('click', excluirEvento, false);
  console.log(document.getElementById('excluir-btn'))
  carregarValores(evento_id);
});