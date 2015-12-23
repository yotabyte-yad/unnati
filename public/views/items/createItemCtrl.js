app.controller("createItemCtrl", function ($timeout, $location, $scope, $http, ItemFactory){
	$scope.myDecimal = 0;
	$scope.itemModel = {};
	$scope.itemModel.item_tax_per = 0;


		$scope.createItem = function(){
				
		//SalesInvoiceFactory.create($scope.dummySalesInvoiceModel)
		ItemFactory.create($scope.itemModel)
				.success(function(response){
					toastr.success('Item added successfully to the system');	
					$timeout(function(){														
					$location.url("/listItems"); //go to the list of items
				}, 3000);						
		})
		.error(function(){
			console.log('Error while adding this item');
			toastr.error('Error while adding this item');
		});		

	} //end of function - Save Item

});