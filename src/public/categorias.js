document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-categoria");
  const categoriasContainer = document.getElementById("categorias");

  async function carregarCategorias() {
    const res = await fetch("/api/categorias");
    const categorias = await res.json();
    categoriasContainer.innerHTML = "";
    categorias.forEach(c => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${c.nome}</h3>
        <p>${c.descricao || '-'}</p>
        <p>Data de Criação: ${c.data_criacao ? new Date(c.data_criacao).toLocaleDateString() : '-'}</p>
        <p>ID da Tarefa: ${c.tarefa_id || '-'}</p>
        <button onclick="editar(${c.id})">Editar</button>
        <button onclick="excluir(${c.id})">Excluir</button>
      `;
      categoriasContainer.appendChild(div);
    });
  }

  window.editar = async (id) => {
    const res = await fetch("/api/categorias/" + id);
    const categoria = await res.json();
    form.id.value = categoria.id;
    form.nome.value = categoria.nome;
    form.descricao.value = categoria.descricao;
    form.data_criacao.value = categoria.data_criacao?.split("T")[0] || "";
    form.tarefa_id.value = categoria.tarefa_id;
  };

  window.excluir = async (id) => {
    await fetch("/api/categorias/" + id, { method: "DELETE" });
    carregarCategorias();
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dados = {
      nome: form.nome.value,
      descricao: form.descricao.value,
      data_criacao: form.data_criacao.value,
      tarefa_id: form.tarefa_id.value
    };
    const id = form.id.value;
    if (id) {
      await fetch("/api/categorias/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });
    } else {
      await fetch("/api/categorias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });
    }
    form.reset();
    carregarCategorias();
  });

  carregarCategorias();
});
