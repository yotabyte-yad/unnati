app.controller("createSalesInvoiceCtrl", function ($scope, $templateCache, $http, SalesInvoiceFactory, $timeout, $location){



$scope.salesInvoiceModel = {};

	//Invoice header
	$scope.salesInvoiceModel.billno = 0;
	$scope.salesInvoiceModel.sales_date = new Date();
	$scope.salesInvoiceModel.patient;
	$scope.salesInvoiceModel.doctor;

	$scope.salesInvoiceModel.items = [];

	//discount
	$scope.salesInvoiceModel.discount_amt = 0;

	// amount
	$scope.salesInvoiceModel.gross_amount = 0;
	$scope.salesInvoiceModel.net_amount = 0;

	$scope.salesInvoiceModel.items.push({
	         sales_item_master_id:undefined,
	         item_barcode: undefined,
	         item_name:undefined,
	         sales_item_purchase_qty:0,
	         sales_tax_per: 0,
	         item_sales_price: 0
	         });		

	$scope.addItem = function(){
		
		//Add blank row only if there are less than 1 blank row remaining
		//no point in adding blank rows if 2 of them already exists

		var blank = 0;
		for(count=0;count < $scope.salesInvoiceModel.items.length;count++){
			if($scope.salesInvoiceModel.items[count].item_name === undefined) {
				//console.log($scope.salesInvoiceModel.items[count].item_name);
				blank += blank + 1;
			}			
		}


		if(blank == 0){
			$scope.salesInvoiceModel.items.push({
	         sales_item_master_id:undefined,
	         item_barcode: undefined,
	         item_name:undefined,
	         sales_item_purchase_qty:0,
	         sales_tax_per: 0,
	         item_sales_price: 0
	         });						
		}
		//console.log($scope.billModel.items);
	}


	$scope.removeItem = function(item){
		$scope.salesInvoiceModel.items.splice($scope.salesInvoiceModel.items.indexOf(item),1);
	}

	$scope.totalPrice = function(){
			var subtotal = 0;
			for(count=0;count<$scope.salesInvoiceModel.items.length;count++){
				subtotal += (($scope.salesInvoiceModel.items[count].item_sales_price || 0) * ($scope.salesInvoiceModel.items[count].sales_item_purchase_qty || 0));
			}
			$scope.salesInvoiceModel.gross_amount = subtotal;
			$scope.salesInvoiceModel.gross_amount = numeral($scope.salesInvoiceModel.gross_amount).format('0');
			$scope.salesInvoiceModel.net_amount = subtotal - $scope.salesInvoiceModel.discount_amt;
			$scope.salesInvoiceModel.net_amount = numeral($scope.salesInvoiceModel.net_amount).format('0');
			return subtotal;
	};

	$scope.grandTotal = function(){
			var grandtotal = 0;
			grandTotal = (($scope.totalPrice() || 0) - ($scope.salesInvoiceModel.discount_amt || 0));
			$scope.salesInvoiceModel.net_amount = grandTotal() || 0;

			return grandtotal;
	};

	

	$scope.saveSalesInvoice = function(){
				
		//SalesInvoiceFactory.create($scope.dummySalesInvoiceModel)
		SalesInvoiceFactory.create($scope.salesInvoiceModel)
				.success(function(response){
					console.log('saveSalesInvoice', response);
					toastr.success('Sales Invoice created successfully');	

				// 	$timeout(function(){														
				// 	$location.url("/mfgslist");
				// }, 3000);						
				//setTimeout("location.reload(true);", 600);
		})
		.error(function(){
			console.log('Error while adding this Bill');
			toastr.error('<b>Seems there is an issue </b>');
		});		

	} //end of function - saveSalesInvoice

	var item_row = {};

	data_interlink = function(selectedRecord, index){
			item_row = selectedRecord;
			$scope.salesInvoiceModel.items[index].sales_item_master_id = selectedRecord.id;
			$scope.salesInvoiceModel.items[index].item_barcode = selectedRecord.item_barcode;
			$scope.salesInvoiceModel.items[index].item_name = selectedRecord.item_name;
			$scope.salesInvoiceModel.items[index].item_sales_price = selectedRecord.item_salesprice;
			$scope.salesInvoiceModel.items[index].sales_tax_per = selectedRecord.item_tax_per;
	}


}); //end controller



//autocomplete script
$(document).on('focus','.autocomplete_txt',function(){
	$(this).autocomplete({
		source: function( request, response ) {
			$.ajax({
				url : 'item',
				dataType: "json",
				data: {
				   q: request.term
				},
				 success: function( data ) {
					 response( $.map( data, function( item ) {
					 	//console.log(item);
						return {
							id: item.item_id,
							value: item.item_name,
							data : item
						}
					}));
				}
			});
		},
		autoFocus: true,	      	
		minLength: 3,
		select: function( event, ui ) {
			id_arr = $(this).attr('id');
	  	index = id_arr.split("_");
	  	element_id = index[index.length-1]; //gives the index of the 
	  	data_interlink(ui.item.data, element_id);

		}		      	
	});
});


//autocomplete script for item barcode
$(document).on('focus','.autocomplete_barcode',function(){
	$(this).autocomplete({
		source: function( request, response ) {
			$.ajax({
				url : 'itembybarcode',
				dataType: "json",
				data: {
				   q: request.term
				},
				 success: function( data ) {
					 response( $.map( data, function( item ) {
					 	//console.log(item);
						return {
							id: item.item_id,
							value: item.item_barcode,
							data : item
						}
					}));
				}
			});
		},
		autoFocus: true,	      	
		minLength: 3,
		select: function( event, ui ) {
			id_arr = $(this).attr('id');
	  	index = id_arr.split("_");
	  	element_id = index[index.length-1]; //gives the index of the 
	  	data_interlink(ui.item.data, element_id);

		}		      	
	});
});
