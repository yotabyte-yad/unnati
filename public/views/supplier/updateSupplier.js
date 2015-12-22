
//Fields in model - name, tin, address, state, pincode, phone, person, email, active  
app.controller("updateSupplierCtrl", function ($timeout, $location, $scope, $http, Suppliers){

	(function(){
		$scope.supplierModel = Suppliers.supplier;
		if ($scope.supplierModel.name === undefined){
				$location.url("/supplierslist");
		}
		//console.log('updateSupplierCtrl', $scope.supplierModel);
	}());


	$scope.updateSupplier = function(response){
		//console.log($scope.supplierModel);
		Suppliers.update($scope.supplierModel)
		.success(function(){
				$scope.error = 0;
				// 	toastr.success('Supplier <b>' + $scope.supplierModel.name +'</b> updated successfully');	
				// 	$timeout(function(){														
				// 	$location.url("/supplierlist");
				// }, 3000);		

		})
		.error(function(){
				toastr.error('Error while updating Supplier');
				console.log('Error while updating Supplier');
		});

		toastr.success('Supplier <b>' + $scope.supplierModel.name +'</b> updated successfully');
	};
});	