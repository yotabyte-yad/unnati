var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var knex      = require('./db').knex;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');

var _ = require('underscore');
var db = require('./db.js');

var knex = require("./dbconfig.js").knex;

var createItemInDB = require("./crud.js").createItemInDB;

var dateFormat = require('dateformat');
var printer = require('printer');
var S = require('string');
var numeral = require('numeral');

var globalBillDetails = {};

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

		



			var printBill = function() {
				
				var company_name    = '           UNNATI CYBER TECH' + '\n';
				var seperator       = '----------------------------------------' + '\n';
				var address_line1   = '             MARCELA - GOA' + '\n';
				var address_line2		= '          0832-000000'  + '\n';
				var header          = ' ITEM                 Qty   Rate   Value' + '\n';
				var test            = '1234567890123456789012345678901234567890' + '\n';

				//console.log('Starting Printing Bill --- 1');
				
				var printItems = '';
						var items = 0;
						globalBillDetails.items.forEach(function(elem){
							if(elem.sales_item_purchase_qty > 0){
								item = items + 1;		
								elem.item_sales_price = numeral(elem.item_sales_price).format('0.00');
								elem.item_value       = numeral((elem.sales_item_purchase_qty * elem.item_sales_price ) || 0).format('0.00');							
								elem.item_name        = elem.item_name.substring(0, 18);
								elem.item_name 		  = S(elem.item_name).padRight(18);
								elem.sales_item_purchase_qty = S(elem.sales_item_purchase_qty).padLeft(3);
								elem.item_sales_price        = S(elem.item_sales_price).padLeft(6);
								elem.item_value              = S(elem.item_value).padLeft(7);

								

								printItems += elem.item_name 
												+ '  ' + elem.sales_item_purchase_qty 
												+ '  ' + elem.item_sales_price 
											    + '  ' + elem.item_value + '\n';

								//console.log('Print Element');
								//console.log(printItems);			    

							}			    
						});

						//l_gross_amount             =  'GROSS AMOUNT        Rs. ' + S(elem.gross_amount).padLeft(16);
						//l_discount_amount          =  'DISCOUNT            Rs. ' + S(elem.discount_amt).padLeft(16);
						l_net_amount               =  'AMOUNT PAYABLE      Rs. ' + S(globalBillDetails.net_amount).padLeft(16) + '\n';
						//console.log(elem.net_amount);
						console.log('globalBillDetails', globalBillDetails);			
						//console.log(printItems);
						console.log('Starting Printing Bill --- 2');
					    fs.writeFile('bill.txt', seperator + company_name + seperator + address_line1 + address_line2 
					    	+ seperator + header + seperator + test + seperator + printItems + seperator + l_net_amount + seperator
					    ,function (err) {
					        if (err) throw err;
					        console.log('Its saved! in same location.');
					    });

						require('child_process').exec(__dirname + "/file.bat", function (err, stdout, stderr) {
						    if (err) {
						        // Ooops.
						        // console.log(stderr);
						        return console.log(err);
						    }
						    // Done.
						    console.log(stdout);
						});

			}

/// Working Print code is above	

app.post('/item', function(req, res){
	var body = _.pick(req.body, 'id','item_barcode', 'item_name', 'item_loc', 'item_description','item_current_stock',
															'item_reorder_level', 'item_reorder_qty',  'item_costprice','item_salesprice', 'item_tax_per' );
	res.json(body);

	db.items.create(body).then(function(item){
		res.json(item.toJSON());
	},function(e){
		console.log('Error creating Item: ' + e);
	});
}); 

//GET - Fetch all the items
app.get('/item', function(req, res){

	var query = req.query;
	var where = {};
		//where.active = true;

	if(query.hasOwnProperty('q') && query.q.length > 0){
		where.item_name = {
			$like: '%' + query.q + '%'
		};
	}	

	db.items.findAll({where: where})
		.then(function(items){		
			//console.log(items);
			res.json(items);			
	}, function(e){
		res.status(500).send('Error in fetch (GET) all items: ' + e);
	});
});	

//GET - Fetch item by barcode
app.get('/itembybarcode', function(req, res){
	var query = req.query;
	var where = {};
		//where.active = true;

	if(query.hasOwnProperty('q') && query.q.length > 0){
		where.item_barcode = {
			$like: '%' + query.q + '%'
		};
	}	

	db.items.findAll({where: where})
		.then(function(items){		
			//console.log(items);
			res.json(items);			
	}, function(e){
		res.status(500).send('Error in fetch (GET) all items: ' + e);
	});
});

//GET all the items
app.get("/item_detail", function (req, res){
	var query = req.query;
	var where = {};
	
	if(query.hasOwnProperty('q') && query.q.length > 0){
		where.item_name = {
			$like: '%' + query.q + '%'
		};
	}
	
	db.items.findAll({
		attributes: ['id','item_name'],
		where: where
	
	}).then(function(items){
		res.json(items);
	}, function(e){
		res.status(500).send('Error in Finding all the items: ' + e);
	});
});


// PUT /item/:id
app.put ('/item/:id', function(req, res){
	var body = _.pick(req.body, 'id','item_barcode', 'item_name', 'item_loc', 'item_description','item_current_stock',
															'item_reorder_level', 'item_reorder_qty',  'item_costprice','item_salesprice', 'item_tax_per' );

	//console.log('updating', body);
	db.items.findById(req.body.id).then( function (item){
			if(item){
				return item.update(body);

			}else

			{
				res.status(404).send("ITEM ID not found to update");
			}
	res.json(item);
	});
});

app.get("/rest/user", auth, function(req, res){
      //var allusers = knex.select('username').from('users').then (function(rows){res.send(rows)});
});

app.get("/logout", function (req, res){
	console.log("LOGGIN OUT " + req.user.username)
  req.logOut();
	res.send(200);

});


//GET - Fetch all the manufacturers
app.get('/mfgs', function(req, res){
	var query = req.query;
	var where = {};
		where.active = true;

	if(query.hasOwnProperty('q') && query.q.length > 0){
		where.name = {
			$like: '%' + query.q + '%'
		};
	}	

	db.mfgs.findAll({where: where})
		.then(function(mfgs){		
			//console.log(mfgs);
			res.json(mfgs);			
	}, function(e){
		res.status(500).send('Error in fetch (GET) all Manufacturers: ' + e);
	});
});	

//POST - Add a new manufacturer to database
app.post('/mfgs', function(req, res){
	var body = _.pick(req.body, 'name', 'address', 'state','pincode', 'active');
	body.name = body.name.trim();
	body.address = body.address.trim();
	body.state = body.state.trim();
	//body.pincode = body.pincode.trim();
	//console.log(body);
	
	db.mfgs.create(body).then(function(mfgs){
		res.json(mfgs.toJSON());
	}, function(e){
		res.status(400).json(e);
		console.log(e);
	});

});

//PUT Request for updating a Manufacturer

app.put ('/mfgs/:id', function(req, res){

	var body = _.pick(req.body, 'id', 'name', 'address', 'state','pincode', 'active');
	//console.log('updating', body);
	db.mfgs.findById(req.body.id).then( function (mfgs){
			if(mfgs){
				return mfgs.update(body);

			}else

			{
				res.status(404).send("ID not found to update");
			}
	res.json(mfgs);
	});
});	



//GET all the suppliers
app.get('/suppliers', function(req, res){
	//var query = req.query;
	// var where = {};
	// 	where.active = true;

	var query = req.query;
	var where = {};
		where.active = true;

	if(query.hasOwnProperty('q') && query.q.length > 0){
		where.name = {
			$like: '%' + query.q + '%'
		};
	}	


	db.suppliers.findAll({
		 where: where
	})
		.then(function(suppliers){
		//console.log(suppliers);
		res.json(suppliers);		
		//console.log(suppliers.description);
	}, function(e){
		res.status(500).send('Error in Find all Suppliers  :' + e);
	});

});				
	
//POST /suppliers
//Fields in model - name, tin, address, state, pincode, phone, person, email, active 
app.post('/suppliers', function(req, res){
	var body = _.pick(req.body, 'name','tin','address', 'state',
															'pincode', 'phone','person','email', 'active');
	body.name = body.name.trim();
	console.log(body);
	
	db.suppliers.create(body).then(function(supplier){
		res.json(supplier.toJSON());
	}, function(e){
		res.status(400).json(e);
		console.log(e);
	});

});


// PUT /suppliers/:id
app.put ('/suppliers/:id', function(req, res){
	//var supplierId = parseInt(req.params.id);
	var body = _.pick(req.body, 'name','tin','address', 'state',
															'pincode', 'phone','person','email', 'active');

	//console.log('updating', body);
	db.suppliers.findById(req.body.id).then( function (supplier){
			if(supplier){
				return supplier.update(body);

			}else

			{
				res.status(404).send("ID not found to update");
			}
	res.json(supplier);
	});
});

/// BEGIN: Code related to Purchase Invoices

//GET all the purchaseinvoice
app.get('/purchaseinvoice', function(req, res){
	//var query = req.query;
	var where = {};
		//where.active = true;
	db.purchases.findAll({
		 where: where
	})
		.then(function(purchaseInvoices){		
		res.json(purchaseInvoices);		
	}, function(e){
		res.status(500).send('Error in getching all purchases invoices   :' + e);
	});

});		

//GET all the purchaseinvoice by joining with supplier
app.get('/purchaseinvoicelist', function(req, res){
		db.sequelize.query("select purchases.id, invoice_date, supplier_id, name, supplier_invoice_ref, discount_amt, gross_amount, remarks from purchases , suppliers where purchases.supplier_id = suppliers.id")
			.then(function(invoices) {
		  	console.log(invoices[0]);
		  	res.json(invoices[0]);
		})

	});			
	
//POST /purchaseinvoice
//Fields in model - 'date','supplier_id','supplier_invoice_ref', 'discount_amt', 
															//'gross_amount', 'net_amount','supplier_invoice_date','remarks'
app.post('/purchaseinvoice', function(req, res){

	var purchaseInvoiceHeader = _.pick(req.body, 'invoice_date','supplier_id','supplier_invoice_ref', 'discount_amt',
															'gross_amount', 'net_amount','supplier_invoice_date','remarks');
	var purchaseInvoiceItems 	= _.pick(req.body,'items');

	//date format interchange
		var l_invoice_date = new Date(purchaseInvoiceHeader.invoice_date); 
		var l_supplier_invoice_date = new Date(purchaseInvoiceHeader.supplier_invoice_date); 
		purchaseInvoiceHeader.invoice_date 					 = dateFormat(l_invoice_date, "dd/mm/yyyy"); 
		purchaseInvoiceHeader.supplier_invoice_date  = dateFormat(l_supplier_invoice_date, "dd/mm/yyyy");

		var ph = purchaseInvoiceHeader;
		db.purchases.create(purchaseInvoiceHeader).then(function(header){
				resBody = header;
				purchase_id = header.id;
				
				//Now saving the items on the purchaseInvoice
				purchaseInvoiceItems.items.forEach(function(elem){
						if(elem.purchase_item_purchase_qty != 0){
							elem.purchase_id = 	purchase_id;
							//console.log(elem);
		     			db.purchase_details.create(elem).then(function(item){
	       				//console.log(elem);	
	       				//Increase the quantity of items(item_current_stock) by the number of units purchased (elem.quantity)
	       				db.sequelize.query("UPDATE items SET item_current_stock = item_current_stock +" + elem.purchase_item_purchase_qty 
	       									+ " WHERE id =" + elem.purchase_item_master_id)
												.spread(function(results, metadata) {
						 						 //console.log(metadata);
						 						});
	       			}, function(e){
	       				res.status(400).json(e);
	       				//console.log(e);
	       			});
						}
				});
				res.json('Success');
		}, function(e){
			res.status(400).json(e);
			console.log(e);
		});
});


// PUT /purchaseinvoice/:id

app.put ('/purchaseinvoice/:id', function(req, res){
	//var supplierId = parseInt(req.params.id);
	var body = _.pick(req.body, 'name','tin','address', 'state',
															'pincode', 'phone','person','email', 'active');

	//console.log('updating', body);
	db.suppliers.findById(req.body.id).then( function (supplier){
			if(supplier){
				return supplier.update(body);

			}else

			{
				res.status(404).send("ID not found to update");
			}
	res.json(supplier);
	});
});
//// END: Code related to Purchase Invoices

//// BEGIN: Code related to Sales Invoices

//GET all the salesinvoice
app.get('/salesinvoice', function(req, res){
	//var query = req.query;
	var where = {};
		where.active = true;


	db.suppliers.findAll({
		 where: where
	})
		.then(function(suppliers){
		
		res.json(suppliers);		
	}, function(e){
		res.status(500).send('Error in Find all   :' + e);
	});

});				
	
//POST /salesinvoice

app.post('/salesinvoice', function(req, res){
	var salesInvoiceHeader = _.pick(req.body, 'sales_date', 'buyer', 'discount_amt', 'net_amount','gross_amount');
	var salesInvoiceItems = _.pick(req.body,'items');

	var l_sales_date			   = new Date(salesInvoiceHeader.sales_date); 
	salesInvoiceHeader.sales_date  = dateFormat(l_sales_date, "dd/mm/yyyy");
	//globalBillDetails.sales_date   =  salesInvoiceHeader.sales_date;

	var billNo = undefined;
	var resBody = {};

	globalBillDetails = salesInvoiceHeader;
	db.sales.create(salesInvoiceHeader).then(function(header){
			resBody = header;
			//console.log(resBody);
			billNo = header.id;

			globalBillDetails.billNo     = header.id;
			//globalBillDetails.sales_date = header.sales_date;
			globalBillDetails.items      = salesInvoiceItems.items; 
			//now the object is ready to be sent to the client 

		salesInvoiceItems.items.forEach(function(elem) {
        if (elem.sales_item_purchase_qty != 0) {
        	  //elem.id = billNo;
        	  elem.sales_id = billNo;
        	  // elem.item_sales_price = numeral(elem.item_sales_price).format('0.00');
      		  //console.log('Each item', elem);      			
      			db.sales_details.create(elem).then(function(item){
      				//console.log(elem);	
      				//Reduce the quantity of items(item_current_stock) by the number of units purchased (elem.quantity)
      				db.sequelize.query("UPDATE items SET item_current_stock = item_current_stock -" + elem.sales_item_purchase_qty 
      																							+ " WHERE id =" + elem.sales_item_master_id)
      				.spread(function(results, metadata) {
							 //console.log(metadata);
							 //console.log(globalBillDetails);
							 //printBill();							 
							});

      			}, function(e){
      				res.status(400).json(e);
      				//console.log(e);
      			});
        }
    });	
		res.json(globalBillDetails);
		//console.log(header.id);
	}, function(e){
		res.status(400).json(e);
		console.log(e);
	}).then(function(){
		console.log('Printing Bill');
		printBill();
	   });
});


// PUT /salesinvoice/:id

app.put ('/salesinvoice/:id', function(req, res){
	//var supplierId = parseInt(req.params.id);
	var body = _.pick(req.body, 'name','tin','address', 'state',
															'pincode', 'phone','person','email', 'active');

	//console.log('updating', body);
	db.suppliers.findById(req.body.id).then( function (supplier){
			if(supplier){
				return supplier.update(body);

			}else

			{
				res.status(404).send("ID not found to update");
			}
	res.json(supplier);
	});
});

////END: Code related to Sales Invoices



db.sequelize.sync({force: false}).then(function(){	
		var server = app.listen(5000, function () {
		var host = server.address().address;
		var port = server.address().port;
		console.log('Example app listening at localhost', host, port);
		});	
});


//List of all the service points
// 1) Items
// 	1)	GET   ALL Items
// 	2)	GET   Specific Item
// 	3) PUT   Edit Specifict Item
// 	4) DEL   Delete a Item
// 	5) POST  Create a new Item

// 2) Supplier
// 	1)	GET   ALL Suppliers
// 	2)	GET   Specific Supplier
// 	3) PUT   Edit Specifict Supplier
// 	4) DEL   Delete a Supllier
// 	5) POST  Create a new Supplier



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

// db.sequelize.sync().then(function(){
// 		app.listen (PORT, function(){
// 		console.log('Express listening on port: ' + PORT);
// 	});
// });




