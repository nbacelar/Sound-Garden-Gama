//função de cadastro de evento
async function cadastrar() {
  try {
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
    const req = await fetch('https://xp41-soundgarden-api.herokuapp.com/events',{
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    
    if(req.status == 201){
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
  document.getElementById('enviar').addEventListener('click', cadastrar);
  console.log()
});