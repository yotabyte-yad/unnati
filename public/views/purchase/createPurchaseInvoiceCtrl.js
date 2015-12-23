app.controller("createPurchaseInvoiceCtrl", function ($location, $scope, Manufacturers, $timeout){
	//TODO

	//Test Purchase Invoi
	$scope.purchaseInvoiceModel = {};
	$scope.purchaseInvoiceModel.date = global_currentDate;
	//console.log('model date', $scope.purchaseInvoiceModel.date);
	$scope.purchaseInvoiceModel.items = [];
	$scope.dummypurchaseInvoiceModel = {"items":[{"itemname":"dojo","quantity":"1","sch":false,
														"mfg":"","batch":"","expdate":"","price":100,"amount":""},
																		{"itemname":"crocin","quantity":"2","sch":false,
														"mfg":"","batch":"","expdate":"","price":100,"amount":""},
																		{"itemname":"allegra","quantity":"3","sch":false,
														"mfg":"","batch":"","expdate":"","price":100,"amount":""},
																		{"itemname":"Nasomist","quantity":"4","sch":false,
														"mfg":"","batch":"","expdate":"","price":100,"amount":""},
														       ],
													"date":"12/11/2015",
													"patient":"TestP",
													"doctor":"TestDoc",
													"discount":"100"};


	$scope.addItem = function(){
		$scope.purchaseInvoiceModel.date = global_currentDate;
		//Add blank row only if there are less than 1 blank row remaining
		//no point in adding blank rows if 2 of them already exists
		//console.log($scope.purchaseInvoiceModel);
		var blank = 0;
		for(count=0;count < $scope.purchaseInvoiceModel.items.length;count++){
			if($scope.purchaseInvoiceModel.items[count].item_name === undefined) {
				blank += blank + 1
			}			
		}

		if(blank == 0){
			$scope.purchaseInvoiceModel.items.push({
	         id:undefined,
           item_barcode:undefined,
           item_name:undefined,
           purchase_item_purchase_qty:0,
           purchase_item_costprice:0,
           item_salesprice: 0,
           item_tax_per: 0
	         });						
		}
		//console.log($scope.purchaseInvoiceModel.items);
	}


	$scope.removeItem = function(item){
		$scope.purchaseInvoiceModel.items.splice($scope.purchaseInvoiceModel.items.indexOf(item),1);
	}


	$scope.totalPrice = function(){
			var subtotal = 0;
			for(count=0;count<$scope.purchaseInvoiceModel.items.length;count++){
				subtotal += (($scope.purchaseInvoiceModel.items[count].purchase_item_costprice || 0) * ($scope.purchaseInvoiceModel.items[count].purchase_item_purchase_qty || 0));
			}
			return subtotal;
	};

	$scope.grandTotal = function(){
			var grandtotal = 0;
			grandTotal = (($scope.totalPrice() || 0) - ($scope.purchaseInvoiceModel.discount_amt || 0));
			$scope.purchaseInvoiceModel.net_amount = $scope.grandTotal() || 0;
			return grandtotal;
	};



	$('#supplier_name').autocomplete({
		      	source: function( request, response ) {
		      		$.ajax({
		      			url : 'suppliers',
		      			dataType: "json",
						data: {
						   q: request.term
						},
						 success: function(data) {
						 		//console.log('Hello', data);
							 response( $.map( data, function( supplier ) {
								//console.log(supplier);
								return {
									label: supplier.name,
									value: supplier.name,
									id: supplier.id
								}
							}));
						}
		      		});
		      	},
		      	autoFocus: true,
		      	minLength: 0,
		      	select: function( event, ui ) {
		      						console.log(ui.item);
											// var names = ui.item.data.split(",");						
											//$('#id').val(ui.item.id);
											$scope.purchaseInvoiceModel.id = ui.item.id;
											$scope.purchaseInvoiceModel.name  = ui.item.value; //this is wrong, i was trying something
											$scope.$apply();
										}      	
		      });

		$('.item_autocomplete').autocomplete({
		      	source: function( request, response ) {
		      		$.ajax({
		      			url : 'suppliers',
		      			dataType: "json",
						data: {
						   q: request.term
						},
						 success: function(data) {
						 		//console.log('Hello', data);
							 response( $.map( data, function( supplier ) {
								//console.log(supplier);
								return {
									label: supplier.name,
									value: supplier.name,
									id: supplier.id
								}
							}));
						}
		      		});
		      	},
		      	autoFocus: true,
		      	minLength: 0,
		      	select: function( event, ui ) {
		      						console.log(ui.item);
											// var names = ui.item.data.split(",");						
											//$('#id').val(ui.item.id);
											$scope.purchaseInvoiceModel.id = ui.item.id;
											$scope.purchaseInvoiceModel.name  = ui.item.value; //this is wrong, i was trying something
											$scope.$apply();
										}      	
		      });			      												

});