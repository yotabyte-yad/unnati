app.controller("mfgsUpdateCtrl", function ($location, $scope, Manufacturers, $timeout){
	
	//console.log($routeParams);

	(function(){
		$scope.mfgsModel = Manufacturers.manufacturer;
		if ($scope.mfgsModel.name === undefined){
				$location.url("/mfgslist");
		}
	}());

	//console.log('mfgsEditCtrl', $scope.mfgsModel);

	$scope.UpdateManufacturer = function(){
		Manufacturers.update($scope.mfgsModel)
		.success(function(){
			toastr.success('Changes saved successfully');					
		})
		.error(function(){
				toastr.error('Error while updating Manufacturers');
				console.log('Error while updating Manufacturers');
		});
	  toastr.success('Manufacturer updated successfully');
	  
	};

});	