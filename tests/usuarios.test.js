const request = require('supertest');
const app = require('../server'); // Ajuste o caminho se precisar

describe('Teste da API de usuários', () => {
  it('Deve criar um usuário via POST /api/app_users', async () => {
    const novoUsuario = {
      username: 'testuser',
      email: 'testuser@example.com',
      senha_hash: '123456'
    };

    const response = await request(app)
      .post('/api/app_users')
      .send(novoUsuario);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe(novoUsuario.username);
    expect(response.body.email).toBe(novoUsuario.email);
  });
});
