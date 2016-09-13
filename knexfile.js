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
