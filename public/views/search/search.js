

// app.controller("searchCtrl", function ($scope){
   
	
// });	

app.controller('searchCtrl', function($scope, $templateCache, $http) {

  $scope.selectedState = '';
  /* these are the initial values */
  $scope.states = ['Alabama', 'Alaska', 'Arizona'];
  
  /* this function is exceutes once to fech all the states and put it into $scope.states global variable */
  (function(){
    $http.get('http://maps.googleapis.com/maps/api/geocode/json', {params: ''})
    .then(function(res) {
      console.log('Response', res);
      $scope.states = res;
    });  
  }());
  
  $scope.selectedAddress = '';
  $scope.getAddress = function(viewValue) {
    var params = {address: viewValue, sensor: false};
    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {params: params})
    .then(function(res) {
      return res.data.results;
    });
  };
  
  $scope.selectedItem = '';
  $scope.getItems = function(viewValue) {
    var params = {q: viewValue, sensor: false};
    return $http.get('http://localhost:5000/items', {params: params})
    .then(function(res) {
      console.log('My function ... ', res.data);
      return res.data.results;
    });
  };

  
});
