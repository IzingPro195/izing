const axios = require('axios');

async function autenticar(req, res) {
  const { username, password } = req.body;

  // Realizar autenticação com as credenciais fornecidas
  try {
    const response = await axios.post('https://auth.izing.app/?rest_route=/izingpro/v1/auth', {
      username: process.env.USUARIO_API,
      password: process.env.SENHA_API

    });

    // Retorna a resposta da autenticação para o cliente
    res.json(response.data);
  } catch (error) {
    // Tratar erros de autenticação
    res.status(500).json({ error: 'Erro na autenticação' });
  }
}

module.exports = {
  autenticar
};