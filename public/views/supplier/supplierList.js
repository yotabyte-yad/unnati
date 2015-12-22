app.controller("supplierListCtrl", function ($location, $scope, $http, Suppliers, $timeout){
	$scope.supplierModel = {};
	$scope.allSuppliers = [];
	$scope.search = {};

		$scope.GetAllData = function () {
	    Suppliers.getAll()
	    .success(function (data, status, headers, config) {
	        $scope.allSuppliers = data;
	        //console.log(data);	        
	    })
	    .error(function (data, status, header, config) {
	        $scope.ResponseDetails = "Data: " + data +
	            "<br />status: " + status +
	            "<br />headers: " + jsonFilter(header) +
	            "<br />config: " + jsonFilter(config);
	    });
	};

	$scope.GetAllData();

	$scope.goToEditScreen = function(id){
			for (var i = 0; i < $scope.allSuppliers.length; i++) {
			  var currSupp = $scope.allSuppliers[i];
			  if (currSupp.id === id) {
			      Suppliers.supplier = currSupp;
			      break;
			  }
			}
		//console.log('LIST EDIT', Suppliers.supplier);
		$location.url("/updateSupplier/" + id);
	}


});