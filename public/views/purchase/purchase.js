//Test 
app.controller("PurchaseCtrl", function ($scope, $http){
 	console.log("Test Purchase");
	 $scope.test_variable = 'Yadnyesh';
	 
/////////////////////////////////////////////////////////   
//consuming REST services GET all suppliers
		$scope.getSuppliers = function getSuppliers() {
			// console.log('changed!');
			//refresh();
			// $http.get("/suppliers").success(function(data) {
			// 			$scope.greeting = data;
			// 			console.log(data);
			// 		});
			$scope.item_row = {};
			
			
			
		}			
//////////////////////////////////////////////////////////	
	// var refresh = 	function(){
	// 	$http.get('http://localhost:3000/suppliers').success(function (response){
	// 				console.log("Got the requested data");
	// 				//var parsed = JSON.parse(response);
	// 				var arr = [];					
	// 				for(var x in response){
	// 				arr.push(response[x]);
	// 				}				
	// 				console.log(arr);
	// 				$scope.contactlist = response;
	// 				$scope.contact = "";
	// 			});
	// 		};



});



//// JSON

