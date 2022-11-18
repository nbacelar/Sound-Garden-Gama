const params = new URLSearchParams(location.search);
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
async function editarEvento(){
  try {
    const inputNome = document.getElementById('nome');
    const inputBanner = document.getElementById('banner');
    const inputAtracoes = document.getElementById('atracoes');
    const inputDescricao = document.getElementById('descricao');
    const inputData = document.getElementById('data');
    const inputLotacao = document.getElementById('lotacao');

    const data = {
      "name": inputNome.value,
      "poster": inputBanner.value,
      "attractions": [
        inputAtracoes.value.split(',')
      ],
      "description": inputDescricao.value,
      "scheduled": inputData.value,
      "number_tickets": inputLotacao.value   
    }

    const req = await fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${evento_id}`,{
      method: 'PUT',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if(req.status == 200){
      inputNome.value = '';
      inputBanner.value = '';
      inputAtracoes.value = '';
      inputDescricao.value = '';
      inputData.value = '';
      inputLotacao.value = '';
      window.alert("Evento editado com sucesso!");
      window.location.replace("admin.html");
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

//carrega o evento na página e associa a função de editarEvento ao botão
window.addEventListener('load', event => {
  document.getElementById('editar-btn').addEventListener('click', editarEvento, false);
  carregarValores(evento_id);
});
