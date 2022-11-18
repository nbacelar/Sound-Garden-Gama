//váriavel auxiliar usada para armazenar opções utilizada no método fetch
var requestOptions = {
  method: 'POST',
  redirect: 'follow',
};

//função de cadastro de evento
async function cadastrar(event) {
  try {
    event.preventDefault()
    const inputNome = document.querySelector("#nome");
    const inputAtracoes = document.querySelector("#atracoes");
    const inputBanner = document.querySelector("#banner");
    const inputDescricao = document.querySelector("#descricao");
    const inputData = document.querySelector("#data");
    const inputLotacao = document.querySelector("#lotacao");
    
    const dados = {
      "name": inputNome.value,
      "poster": inputBanner.value,
      "attractions": [
        inputAtracoes.value.split(',')
      ],
      "description": inputDescricao.value,
      "scheduled": inputData.value,
      "number_tickets": inputLotacao.value   
    }
    //requisição de escrita no servidor
    const req = await fetch('https://xp41-soundgarden-api.herokuapp.com/events', 
    requestOptions,
    {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    
    if(req){
      inputNome.value = '';
      inputBanner.value = '';
      inputAtracoes.value = '';
      inputDescricao.value = '';
      inputData.value = '';
      inputLotacao.value = '';
      window.alert("Evento cadastrado com sucesso!");
      window.location.replace("admin.html");
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

//função que associa o evento de cadastro um evento ao botão 'enviar'
window.addEventListener('load', event => {
  document.querySelector('form').addEventListener('submit', cadastrar);
});