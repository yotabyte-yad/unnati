var server = 'http://localhost:5000';

app.factory('Manufacturers', ['$http', function($http){
	var urlBase = server + '/purchaseinvoice';
	//var Manufacturers = {};

	var manufacturer = {};

	getAll = function(){
		return $http.get(urlBase);
	};

	create = function(mfgsModel) {
		//console.log('appServicesCreate', mfgsModel);
		return $http.post(urlBase, mfgsModel);
	};	

	update = function(mfgsModel){
		//console.log('appServicesUpdate', mfgsModel);
		//return mfgsModel;
		return $http.put(urlBase + '/' + mfgsModel.id, mfgsModel);
	}

	 return {
	 	manufacturer: manufacturer,
	 	getAll: getAll,
	 	create: create,
	 	update: update
	 };

}]);

// Supplier Factory
app.factory('Suppliers',['$http', function($http){
	// variable stores one supplier record, useful during editing
	var supplier = {};
  var urlBase = server + '/suppliers';

  getAll = function(){
		return $http.get(urlBase);
	};

	create = function(supplierModel) {
		console.log('appServicesCreate', supplierModel);
		return $http.post(urlBase, supplierModel);
	};

	update = function(supplierModel){
		//console.log('appServicesUpdate', supplierModel);
		return $http.put(urlBase + '/' + supplierModel.id, supplierModel);
	}
	

	return {
	 	supplier: supplier,
	 	getAll: getAll,
	 	create: create,
	 	update: update
	};


}]);

//Factory for Suppliers
app.factory('SalesInvoiceFactory',['$http', function($http){
	// variable stores one supplier record, useful during editing
	var salesInvoice = {};
  var urlBase = server + '/salesinvoice';

  getAll = function(){
		return $http.get(urlBase);
	};

	create = function(salesInvoiceModel) {
		console.log('appServicesCreate', salesInvoiceModel);
		return $http.post(urlBase, salesInvoiceModel);
	};

	update = function(salesInvoiceModel){
		//console.log('appServicesUpdate', supplierModel);
		return $http.put(urlBase + '/' + salesInvoiceModel.id, salesInvoiceModel);
	}
	

	return {
	 	salesInvoice: salesInvoice,
	 	getAll: getAll,
	 	create: create,
	 	update: update
	};
}]);


//Factory for Suppliers
app.factory('PurchaseInvoiceFactory',['$http', function($http){
	// variable stores one supplier record, useful during editing
	var purchaseInvoice = {};
  var urlBase = server + '/purchaseinvoice';

  getAll = function(){
		return $http.get(urlBase);
	};

	create = function(purchaseModel) {
		console.log('appServicesCreate', purchaseModel);
		return $http.post(urlBase, purchaseModel);
	};

	update = function(purchaseModel){
		//console.log('appServicesUpdate', supplierModel);
		return $http.put(urlBase + '/' + purchaseModel.id, purchaseModel);
	}
	

	return {
	 	purchaseInvoice: purchaseInvoice,
	 	getAll: getAll,
	 	create: create,
	 	update: update
	};

}]);

//Factory for Items
app.factory('ItemFactory',['$http', function($http){
	// variable stores one supplier record, useful during editing
	var item = {};
  var urlBase = server + '/item';

  getAll = function(){
		return $http.get(urlBase);
	};

	create = function(itemModel) {
		return $http.post(urlBase, itemModel);
	};

	update = function(itemModel){
		//console.log('appServicesUpdate', supplierModel);
		return $http.put(urlBase + '/' + itemModel.id, itemModel);
	}
	

	return {
	 	item: item,
	 	getAll: getAll,
	 	create: create,
	 	update: update
	};

}]);