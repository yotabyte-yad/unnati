//Test 
app.controller("PurchaseCtrl", function ($location, $scope, $http, $rootScope){
		
///////////////////////////////////////////////////////// 

			$rootScope.searchItems = [
				"ActionScript",
				"AppleScript",
				"Asp",
				"BASIC",
				"C",
				"C++",
				"Clojure",
				"COBOL",
				"ColdFusion",
				"Erlang",
				"Fortran",
				"Groovy",
				"Haskell",
				"Java",
				"JavaScript",
				"Lisp",
				"Perl",
				"PHP",
				"Python",
				"Ruby",
				"Scala",
				"Scheme"
			];
			
			//Sort Array
			$rootScope.searchItems.sort();
			//Define Suggestions List
			$rootScope.suggestions = [];
			//Define Selected Suggestion Item
			$rootScope.selectedIndex = -1;
			
			//Function To Call On ng-change
			$rootScope.search = function(){
				$rootScope.suggestions = [];
				var myMaxSuggestionListLength = 0;
				for(var i=0; i<$rootScope.searchItems.length; i++){
					var searchItemsSmallLetters = angular.lowercase($rootScope.searchItems[i]);
					var searchTextSmallLetters = angular.lowercase($scope.searchText);
					if( searchItemsSmallLetters.indexOf(searchTextSmallLetters) !== -1){
						$rootScope.suggestions.push(searchItemsSmallLetters);
						myMaxSuggestionListLength += 1;
						if(myMaxSuggestionListLength == 5){
							break;
						}
					}
				}
			}
			
			//Keep Track Of Search Text Value During The Selection From The Suggestions List  
			$rootScope.$watch('selectedIndex',function(val){
				if(val !== -1) {
					$scope.searchText = $rootScope.suggestions[$rootScope.selectedIndex];
				}
			});
			
			
			//Text Field Events
			//Function To Call on ng-keydown
			$rootScope.checkKeyDown = function(event){
				if(event.keyCode === 40){//down key, increment selectedIndex
					event.preventDefault();
					if($rootScope.selectedIndex+1 !== $rootScope.suggestions.length){
						$rootScope.selectedIndex++;
					}
				}else if(event.keyCode === 38){ //up key, decrement selectedIndex
					event.preventDefault();
					if($rootScope.selectedIndex-1 !== -1){
						$rootScope.selectedIndex--;
					}
				}else if(event.keyCode === 13){ //enter key, empty suggestions array
					event.preventDefault();
					$rootScope.suggestions = [];
				}
			}
			//Function To Call on ng-keyup
			$rootScope.checkKeyUp = function(event){ 
				if(event.keyCode !== 8 || event.keyCode !== 46){//delete or backspace
					if($scope.searchText == ""){
						$rootScope.suggestions = [];
					}
				}
			}
			//======================================
			
			//List Item Events
			//Function To Call on ng-click
			$rootScope.AssignValueAndHide = function(index){
				$scope.searchText = $rootScope.suggestions[index];
				$rootScope.suggestions=[];
			}
			//======================================
   
   
/////////////////////////////////////////////////////////   
//consuming REST services GET all suppliers
		$scope.getSuppliers = function getSuppliers($scope, $http) {
			console.log('changed!');
			$http.get('http://localhost:3000/suppliers')
					.success(function(data) {
						$scope.greeting = data;
						console.log(data);
					});
		}			
//////////////////////////////////////////////////////////	
});



//// JSON

