require('dotenv').config();
console.log(process.env.DATABASE_URL)
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/birdofthedei'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
