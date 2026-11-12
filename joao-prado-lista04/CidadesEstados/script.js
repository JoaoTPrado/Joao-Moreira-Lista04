const selectEstado = document.getElementById("estado");
const selectCidade = document.getElementById("cidade");
const selecao = document.getElementById("selecao");

const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

async function carregarEstados() {
  const resposta = await fetch(url);
  const estados = await resposta.json();

  selectEstado.innerHTML = "<option value=''>Selecione</option>";
  for (const estado of estados) {
    selectEstado.innerHTML += "<option value='" + estado.sigla + "'>" + estado.nome + "</option>";
  }
}

selectEstado.addEventListener("change", async () => {
  selecao.textContent = "";
  selectCidade.innerHTML = "";

  const uf = selectEstado.value;
  if (uf === "") return;

  const resposta = await fetch(url + "/" + uf + "/municipios");
  const cidades = await resposta.json();

  selectCidade.innerHTML = "<option value=''>Selecione</option>";
  for (const cidade of cidades) {
    selectCidade.innerHTML += "<option value='" + cidade.nome + "'>" + cidade.nome + "</option>";
  }
});

selectCidade.addEventListener("change", () => {
  if (selectCidade.value === "") return;

  const nomeEstado = selectEstado.options[selectEstado.selectedIndex].text;
  selecao.textContent = "Você selecionou: " + selectCidade.value + " - " + nomeEstado;
});

carregarEstados();