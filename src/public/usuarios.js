document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-usuario");
  const usuariosContainer = document.getElementById("usuarios");

  async function carregarUsuarios() {
    const res = await fetch("/api/usuarios");
    const usuarios = await res.json();
    usuariosContainer.innerHTML = "";
    usuarios.forEach(u => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${u.nome}</h3>
        <p>Email: ${u.email || '-'}</p>
        <p>Nascimento: ${u.data_nascimento ? new Date(u.data_nascimento).toLocaleDateString() : '-'}</p>
        <button onclick="editar(${u.id})">Editar</button>
        <button onclick="excluir(${u.id})">Excluir</button>
      `;
      usuariosContainer.appendChild(div);
    });
  }

  window.editar = async (id) => {
    const res = await fetch("/api/usuarios/" + id);
    const usuario = await res.json();
    form.id.value = usuario.id;
    form.nome.value = usuario.nome;
    form.email.value = usuario.email;
    form.data_nascimento.value = usuario.data_nascimento?.split("T")[0] || "";
  };

  window.excluir = async (id) => {
    await fetch("/api/usuarios/" + id, { method: "DELETE" });
    carregarUsuarios();
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dados = {
      nome: form.nome.value,
      email: form.email.value,
      data_nascimento: form.data_nascimento.value
    };
    const id = form.id.value;
    if (id) {
      await fetch("/api/usuarios/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });
    } else {
      await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });
    }
    form.reset();
    carregarUsuarios();
  });

  carregarUsuarios();
});
