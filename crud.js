var knex = require("./dbconfig.js").knex;

function createItemInDB(item){
	
	var users = {username: item.itemname, password: item.itemname};
	
	knex.insert(users).into("users") 
	.then (function(id){
		console.log(id);
		return knex("users");
	})
	.then(function(rows){
		console.log(rows);
	})
	.finally(function(){
		knex.destroy();
	});
}

module.exports.createItemInDB = createItemInDB;	