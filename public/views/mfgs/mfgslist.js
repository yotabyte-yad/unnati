app.controller("MfgsListCtrl", function ($location, $scope, $http, $rootScope, Manufacturers){
	$scope.mfgsModel = {};
	$scope.search = {};

	$scope.GetAllData = function () {
	    //$http.get('http://localhost:5000/mfgs')
	    Manufacturers.getAll()
	    .success(function (data, status, headers, config) {
	        $scope.allMfgs = data;
	    })
	    .error(function (data, status, header, config) {
	        $scope.ResponseDetails = "Data: " + data +
	            "<br />status: " + status +
	            "<br />headers: " + jsonFilter(header) +
	            "<br />config: " + jsonFilter(config);
	    });
	    //toastr.success('List displayed successfully'); 	    
	};

	$scope.GetAllData();

	$scope.goToEditScreen = function(id){
			for (var i = 0; i < $scope.allMfgs.length; i++) {
			  var currManu = $scope.allMfgs[i];
			  if (currManu.id === id) {
			      Manufacturers.manufacturer = currManu;
			      break;
			  }
			}
		//console.log('LIST EDIT', Manufacturers.manufacturer);
		$location.url("/editmfgs/" + id);
	}




	$scope.SearchData = function () {
            var parameters = {
                q: $scope.keyword
            };
            var config = {
                params: parameters
            };

            $http.get('http://localhost:5000/mfgs', config)
            .success(function (data, status, headers, config) {
                $scope.Details = data;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
        };

});