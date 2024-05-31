import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

const connection = mysql.createConnection({
  host: 'localhost',
  port: Number(process.env.DATABASE_PORT ? process.env.DATABASE_PORT : 3306),
  user: process.env.DATABASE_USER ? process.env.DATABASE_USER : 'root',
  password: process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : 'root',
  database: process.env.DATABASE_DB ? process.env.DATABASE_DB : 'backend_unilavras'
})

export async function connect () {
  connection.connect((err) => {
    if (err) {
      console.error(`${'Erro ao conectar ao banco de dados'}`, (err as Error).message)
      return
    }
    console.log('Conexão bem-sucedida ao banco de dados!')
  })
}

export async function initializeDatabase () {
  try {
    connection.query('CREATE DATABASE IF NOT EXISTS backend_unilavras', (err) => {
      if (err) {
        console.error('Erro ao criar o banco de dados:', err)
        return
      }
      console.log('Banco de dados criado com sucesso!')
    })

    connection.query('USE backend_unilavras', (err) => {
      if (err) {
        console.error('Erro ao conectar ao banco de dados:', err)
        return
      }
      console.log('Usando o banco de dados backend_unilavras')
    })

    connection.query(`
        CREATE TABLE  IF NOT EXISTS produtos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            descricao VARCHAR(100),
            preco DECIMAL(10,2) NOT NULL,
            data_atualizado DATETIME
        );
        `, (err) => {
      if (err) {
        console.error('Erro ao criar a tabela produtos:', err)
        return
      }
      console.log('Tabela "produtos" criada com sucesso!')
    })
    connection.query(`
        CREATE TABLE IF NOT EXISTS clientes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            sobrenome VARCHAR(100),
            email VARCHAR(100) UNIQUE NOT NULL,
            idade INT NOT NULL,
            foto VARCHAR(100)
        );
        `, (err) => {
      if (err) {
        console.error('Erro ao criar a tabela clientes:', err)
        return
      }
      console.log('Tabela "clientes" criada com sucesso!')
    })
  } catch (err) {
    console.error('Erro ao inicializar o banco de dados:', err)
  }
}

export default connection
