// Exemplo usando o módulo 'mysql' para conectar ao banco de dados MySQL

const mysql = require('mysql');

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: '172.17.0.2',
  user: 'root',
  password: 'root',
  database: 'nomedobanco' // substitua 'nomedobanco' pelo nome real do banco de dados
});

// Estabelece a conexão
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }

  console.log('Conexão bem-sucedida ao banco de dados.');

  // Executa a consulta
  connection.query('SELECT * FROM motorista', (error, results, fields) => {
    if (error) {
      console.error('Erro ao executar a consulta:', error);
      return;
    }

    // Exibe os resultados
    console.log('Resultados da consulta:');
    console.log(results);

    // Encerra a conexão
    connection.end((err) => {
      if (err) {
        console.error('Erro ao encerrar a conexão:', err);
        return;
      }

      console.log('Conexão encerrada.');
    });
  });
});
