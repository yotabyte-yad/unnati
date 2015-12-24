app.controller("listPurchaseInvoicesCtrl", function ($location, $scope, PurchaseInvoiceFactory, $timeout){
	//TODO
	$scope.purchaseInvoiceModel = {};
	$scope.allPurchaseInvoices = [];
	$scope.search = {};
	console.log('Now executing GetAllData');
	
	$scope.GetAllData = function () {
	  PurchaseInvoiceFactory.getAll()
	  .success(function (data, status, headers, config) {
	      $scope.allPurchaseInvoices = data;

	      console.log($scope.allPurchaseInvoices);
	      //console.log();       
	  })
	  .error(function (data, status, header, config) {
	  		console.log(data);
	      // $scope.ResponseDetails = "Data: " + data +
	      //     "<br />status: " + status +
	      //     "<br />headers: " + jsonFilter(header) +
	      //     "<br />config: " + jsonFilter(config);
	  });
	};

		$scope.GetAllData();


});