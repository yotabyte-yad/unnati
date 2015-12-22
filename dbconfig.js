var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./book.sqlite"
  }
});

module.exports.knex = knex;
//module.exports = {knex: knex};