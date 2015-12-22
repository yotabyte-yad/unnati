var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var knex      = require('./db').knex;
var passport = require('Passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');

var _ = require('underscore');
var db = require('./db.js');

///DB Configuration
// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: "./book.sqlite"
//   }
// });

var knex = require("./dbconfig.js").knex;

var createItemInDB = require("./crud.js").createItemInDB;


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); //parsing multipart/form data
app.use(session({secret: 'this is the secret'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
	function (username, password, done) {
    
    knex.select("username").from("users").where("username", username).andWhere("password", password).then(function(user){
      if(user){
				return done(null, user);
			}
			return done(null, false, {message:'Unable to login'});
    });
    // sqldb.each("SELECT username, password, roles FROM users where username = ?",[username], function(err, user) {
    //     //console.log(rows.username + ": " + rows.password);
    //     if(user){
		// 		return done(null, user);
		// 	}
		// 	return done(null, false, {message:'Unable to login'});
    // });
}));

passport.serializeUser(function(user, done){
	done(null, user);
});


passport.deserializeUser(function(user, done){
	done(null, user);
});


var auth = function (req, res, next){
	if(!req.isAuthenticated())
		res.send(401);
	else
	    next();
};


app.get('/', passport.authenticate('local'), function (req, res) {
  console.log('Strange Surprising');
  res.send('Hello World!');
});

app.get("/login", function (req, res){
	res.send(req.isAuthenticated() ? req.user : '0');
});

app.post("/login", upload.array(), passport.authenticate('local'), function (req, res){
	console.log(req.user);
	res.json(req.user);
});

  ///Extracting Item values in request body

app.post('/createItem', function(req, res){
  console.log(req.body);
  var item = {};
  item.itemname = req.body.itemname;
	console.log('Printing Name' + item);
  console.log(req.body.barcode);
  console.log(req.body.itemname);
  
  createItemInDB(item);
  
   knex.select().table('items')
    .then(function(rows) {
      console.log(rows);
      res.json(rows);
    })
    .catch(function(error) {
      console.error(error)
    });
  
}); 

app.get("/items", auth, function (req, res){
	res.send(req.isAuthenticated() ? req.user : '0');
});



// app.post('/createItem', function(req, res){
// 	console.log("Request itemid " + req.body);
    
//     // knex.select().table('items')
//     // .then(function(rows) {
//     //   //console.log(rows);
//     //   res.json(rows);
//     // })
//     // .catch(function(error) {
//     //   console.error(error)
//     // });
// });

app.get("/rest/user", auth, function(req, res){
      var allusers = knex.select('username').from('users').then (function(rows){res.send(rows)});
});

app.get("/logout", function (req, res){
	console.log("LOGGIN OUT " + req.user.username)
  req.logOut();
	res.send(200);

});

			/*
			db.sequelize.query("SELECT * FROM suppliers ", { type: db.sequelize.QueryTypes.SELECT})
			.then(function(suppliers) {
				res.json(suppliers);
				console.log(suppliers);
			})
			
						// if(query.hasOwnProperty('completed') && query.completed === 'true')	{
			// 	where.completed = true;
			// } else if(query.hasOwnProperty('completed') && query.completed === 'false') {
			// 	where.completed = false;
			// }
		
			// if(query.hasOwnProperty('q') && query.q.length > 0){
			// 	where.description = {
			// 		$like: '%' + query.q + '%'
			// 	};
			// }
			*/

//GET all the suppliers
app.get('/suppliers', function(req, res){
	var query = req.query;
	var where = {};
		where.active = true;


	db.suppliers.findAll({
		 where : { active: true}
	})
		.then(function(suppliers){
		res.json(suppliers);
		console.log(suppliers.description);
	}, function(e){
		res.status(500).send('Error in Find all   :' + e);
	});

});				

	
//POST /suppliers
app.post('/suppliers', function(req, res){
	var body = _.pick(req.body, 'name', 'address', 'state','pincode', 'active');
	body.name = body.name.trim();
	body.address = body.address.trim();
	body.state = body.state.trim();
	body.pincode = body.pincode.trim();
	console.log(body);
	
	db.suppliers.create(body).then(function(supplier){
		res.json(supplier.toJSON());
	}, function(e){
		res.status(400).json(e);
		console.log(e);
	});

});



db.sequelize.sync().then(function(){	
		var server = app.listen(3000, function () {
		var host = server.address().address;
		var port = server.address().port;
		console.log('Example app listening at localhost', host, port);
		});	
});


// db.sequelize.sync().then(function(){
// 		app.listen (PORT, function(){
// 		console.log('Express listening on port: ' + PORT);
// 	});
// });


