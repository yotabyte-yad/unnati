app.controller("MfgsCtrl", function ($location, $scope, Manufacturers, $timeout){
	//TODO
	$scope.mfgsModel = {};
	$scope.allMfgs = {};
	$scope.order = 'name';
		
	$scope.createMfgs = function(){

		Manufacturers.create($scope.mfgsModel)
		.success(function(response){
					toastr.success('Manufacturer <b>' + $scope.mfgsModel.name +'</b> created successfully');	
					$timeout(function(){														
					$location.url("/mfgslist");
				}, 3000);						
		})
		.error(function(){
			console.log('Error while adding this Manufacturer');
			toastr.error('<b>Seems there is an issue </b>');
		});		
	};
													
});	
	