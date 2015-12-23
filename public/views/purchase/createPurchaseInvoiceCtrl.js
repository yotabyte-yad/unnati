app.controller("createPurchaseInvoiceCtrl", function ($location, $scope, Manufacturers, $timeout){
	//TODO

	//Test Purchase Invoi
	$scope.purchaseInvoiceModel = {};
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

  // $scope.$watch(
  //   "purchaseInvoiceModel.name",
  //   function handleFooChange( newValue, oldValue ) {
  //       console.log( "purchaseInvoiceModel.name", newValue );
  //   });	



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

});