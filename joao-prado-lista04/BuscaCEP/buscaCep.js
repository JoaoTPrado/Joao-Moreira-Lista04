const inputCep = document.getElementById("cep");
const botao = document.getElementById("buscar");
const resultado = document.getElementById("resultado");

botao.addEventListener("click", buscarEndereco);

async function buscarEndereco() {
  // tira tudo que não for número (hífen, espaços...)
  const cep = inputCep.value.replace(/\D/g, "");

  if (cep.length !== 8) {
    resultado.innerHTML = "<p>Erro ao buscar endereço.</p>";
    return;
  }

  try {
    const resposta = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
    const dados = await resposta.json();

    if (dados.erro) {
      resultado.innerHTML = "<p>Erro ao buscar endereço.</p>";
      return;
    }

    resultado.innerHTML =
      "<p><b>Logradouro:</b> " + dados.logradouro + "</p>" +
      "<p><b>Bairro:</b> " + dados.bairro + "</p>" +
      "<p><b>Cidade:</b> " + dados.localidade + "</p>" +
      "<p><b>Estado:</b> " + dados.uf + "</p>";
  } catch (erro) {
    console.log(erro);
    resultado.innerHTML = "<p>Erro ao buscar endereço.</p>";
  }
}