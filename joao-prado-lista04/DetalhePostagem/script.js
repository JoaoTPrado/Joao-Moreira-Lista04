const selectUsuario = document.getElementById("usuario");
const divPostagens = document.getElementById("postagens");
const divDetalhes = document.getElementById("detalhes");

const url = "https://jsonplaceholder.typicode.com";

async function carregarUsuarios() {
  const resposta = await fetch(url + "/users");
  const usuarios = await resposta.json();

  selectUsuario.innerHTML = "<option value=''>Selecione</option>";
  for (const usuario of usuarios) {
    selectUsuario.innerHTML += "<option value='" + usuario.id + "'>" + usuario.name + "</option>";
  }
}

selectUsuario.addEventListener("change", async () => {
  divPostagens.innerHTML = "";
  divDetalhes.innerHTML = "";

  if (selectUsuario.value === "") return;

  const resposta = await fetch(url + "/posts?userId=" + selectUsuario.value);
  const posts = await resposta.json();

  for (const post of posts) {
    const div = document.createElement("div");
    div.textContent = post.title;
    div.style.cursor = "pointer";
    div.style.background = "#eee";
    div.style.margin = "2px 0";
    div.addEventListener("click", () => mostrarDetalhes(post.id));
    divPostagens.appendChild(div);
  }
});

async function mostrarDetalhes(id) {
  const respPost = await fetch(url + "/posts/" + id);
  const post = await respPost.json();

  const respComentarios = await fetch(url + "/posts/" + id + "/comments");
  const comentarios = await respComentarios.json();

  let html = "<h3>" + post.title + "</h3>";
  html += "<p>" + post.body + "</p>";
  html += "<h4>Comentários:</h4>";

  for (const c of comentarios) {
    html += "<p><b>" + c.name + ":</b> " + c.body + "</p>";
  }

  divDetalhes.innerHTML = html;
}

carregarUsuarios();