//Test 
app.controller("ItemsCtrl", function ($location, $scope, $http, $rootScope){
	//console.log("clicked ItemsCtrl");
	$scope.submitting = false;
	$scope.itemModel = {};
	// $scope.item.item_name = 'Change';
	// $scope.item.item_mfg = 'Comp Change';
	// $scope.item.item_sch = 'N';
	// $scope.item.item_tax_per = 0;
	// $scope.item.item_reorder_level = 0;
	// $scope.item.item_reorder_qty = 0;
	// $scope.item.item_description = 'Enter comments';
	
	$scope.createItem = function(item){
		$scope.submitting = true;
		console.log("within ItemsCtrl Items", $scope.itemModel);
		$http.post('/item', $scope.itemModel)
			      .success(function(response){
			console.log('Server Response: ' );
			console.log(response);
				  }).error(function(e){
				console.log('Error', e);
				});
	    $scope.submitting = false;		
   };	
});