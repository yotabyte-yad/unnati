app.controller("updateItemCtrl", function ($timeout, $location, $scope, $http, ItemFactory){
	
	(function(){
		$scope.itemModel = ItemFactory.item;
		if ($scope.itemModel.item_name === undefined){
				$location.url("/listItems");
		}
		//console.log('updateSupplierCtrl', $scope.supplierModel);
	}());


	$scope.updateItem = function(response){
		//console.log($scope.supplierModel);
		ItemFactory.update($scope.itemModel)
		.success(function(){
				$scope.error = 0;
				$timeout(function(){														
					$location.url("/listItems");
				}, 3000);		

		})
		.error(function(){
				toastr.error('Error while updating Supplier');
				console.log('Error while updating Supplier');
		});

		toastr.success('Supplier <b>' + $scope.itemModel.item_name +'</b> updated successfully');
	};
});	