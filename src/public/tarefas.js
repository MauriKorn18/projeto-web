
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-tarefa");
  const tarefasContainer = document.getElementById("tarefas");

  async function carregarTarefas() {
    const res = await fetch("/api/tarefas");
    const tarefas = await res.json();
    tarefasContainer.innerHTML = "";
    tarefas.forEach(t => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${t.titulo}</h3>
        <p>${t.descricao}</p>
        <p>Entrega: ${t.data_entrega ? new Date(t.data_entrega).toLocaleDateString() : "-"}</p>
        <p>Status: ${t.concluido ? "Concluída" : "Pendente"}</p>
        <button onclick="editar(${t.id})">Editar</button>
        <button onclick="excluir(${t.id})">Excluir</button>
      `;
      tarefasContainer.appendChild(div);
    });
  }

  window.editar = async (id) => {
    const res = await fetch("/api/tarefas/" + id);
    const tarefa = await res.json();
    form.id.value = tarefa.id;
    form.titulo.value = tarefa.titulo;
    form.descricao.value = tarefa.descricao;
    form.data_entrega.value = tarefa.data_entrega?.split("T")[0] || "";
    form.concluido.checked = tarefa.concluido;
  };

  window.excluir = async (id) => {
    await fetch("/api/tarefas/" + id, { method: "DELETE" });
    carregarTarefas();
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dados = {
      titulo: form.titulo.value,
      descricao: form.descricao.value,
      data_entrega: form.data_entrega.value,
      concluido: form.concluido.checked
    };
    const id = form.id.value;
    if (id) {
      await fetch("/api/tarefas/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });
    } else {
      await fetch("/api/tarefas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dados, data_criacao: new Date(), usuarios_id: 1 })
      });
    }
    form.reset();
    carregarTarefas();
  });

  carregarTarefas();
});
