const { Client } = require('pg')

// Na construção do nosso client, vamos passar como argumento um JSON com a URI do DB do Heroku
const client = new Client({
  connectionString:
    process.env.DATABASE_URL ||
    'postgres://qdzpqctyieyrcf:f8a65b6dc32f7baf9aa5a047ff0fcc3305139db181f81f77e2c6ae62652e39a2@ec2-34-233-114-40.compute-1.amazonaws.com:5432/dfa5b1n0bo1f00',
  ssl: {
    rejectUnauthorized: false
  }
})

client.connect()

module.exports = function () {
  return client
}
