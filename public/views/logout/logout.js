app.controller("LogoutCtrl", function ($location, $scope, $http, $rootScope){
	$scope.logout = function(user){
		console.log('In Logout: ' +  user);
		$http.get('/logout', user)
		  .success(function(response){
			 $rootScope.currentUser = undefined;
			 $location.url("logout");			 
		  });
	}
});