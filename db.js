var knex = require('knex')({
  client: 'sqlite3',
  connection: { filename: 'book.sqlite' }
});

module.exports = {knex: knex};

// Starting with Sequelize the above code can be 
// deleted 

var Sequelize = require('sequelize');

var env = 'development';

var sequelize;

sequelize = new Sequelize(undefined, undefined, undefined, {
  'dialect' : 'sqlite',
  'storage' : __dirname + '/data/invoice.sqlite'
});

var db = {};

db.suppliers        = sequelize.import(__dirname + '/models/suppliers.js');
//db.customers        = sequelize.import(__dirname + '/models/customers.js');
//db.doctors          = sequelize.import(__dirname + '/models/doctors.js');
db.buyers           = sequelize.import(__dirname + '/models/buyers.js');
db.mfgs             = sequelize.import(__dirname + '/models/mfgs.js');
db.taxes            = sequelize.import(__dirname + '/models/taxes.js');
db.items            = sequelize.import(__dirname + '/models/items.js');
db.item_tax         = sequelize.import(__dirname + '/models/item_tax.js');
db.todos            = sequelize.import(__dirname + '/models/todo.js');
db.purchases        = sequelize.import(__dirname + '/models/purchases.js');
db.purchase_details = sequelize.import(__dirname + '/models/purchase_details.js');
db.sales            = sequelize.import(__dirname + '/models/sales.js');
db.sales_details    = sequelize.import(__dirname + '/models/sales_details.js');

//db.purchases.hasMany(db.purchase_details, {as: 'details'});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
