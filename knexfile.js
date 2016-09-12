module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

}
