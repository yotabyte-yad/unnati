//Paths and controllers

//Suppliers
// 1) createSupplier.html
//	createSupplierCtrl

//Purchase
	// 1)	createpurchaseinvoice.html
	//    createPurchaseInvoiceCtrl
	// 2) listpurchaseinvoices.html
	//   	listPurchaseInvoicesCtrl
	// 3) udpatepurchaseinvoice.html
	//		updatePurchaseInvoiceCtrl	

//Sales
	// 1)	createsalesinvoice.html
	//    createSalesInvoiceCtrl
	// 2) listsalesinvoices.html
	//   	listSalesInvoicesCtrl
	// 3) udpatesalesinvoice.html
	//		updateSalesInvoiceCtrl	



var app = angular.module("ybinvoice",[
					'ngRoute', 
					'ngSanitize', 
					'mgcrea.ngStrap',
					'angular-ladda',
					'ngAnimate',
					'fiestah.money'
					]);

app.config(function($routeProvider) {
  $routeProvider
	.when('/home', {
		// Sales page should be the default page
		templateUrl: 'views/sales/sales.html'
  })
  	.when('/login', {
		templateUrl: 'views/login/login.html',
		controller: 'LoginCtrl'
  })
   	.when('/logout', {
		templateUrl: 'views/logout/logout.html',
		controller: 'LogoutCtrl'		
  })
  	.when('/profile', {
		templateUrl: 'views/profile/profile.html',
		controller: 'ProfileCtrl',
		resolve: {
			//function to check if the person is logged in 
			logincheck: checkLogin
		}
  })
  	.when('/register', {
		templateUrl: 'views/register/register.html',
		controller: 'RegisterCtrl'
  })
    .when('/purchase', {
		templateUrl: 'views/purchase/purchase.html',
		controller: 'PurchaseCtrl'
  })
// BEGIN SECTION --> End point for Suppliers screens  	
  	.when('/createSupplier', {
		templateUrl: 'views/supplier/createSupplier.html',
		controller: 'createSupplierCtrl'
  })
  	.when('/supplierlist', {
		templateUrl: 'views/supplier/supplierslist.html',
		controller: 'supplierListCtrl'
  })
  	.when('/updateSupplier/:id', {
		templateUrl: 'views/supplier/updateSupplier.html',
		controller: 'updateSupplierCtrl'
  })
 // END SECTION --> End point for Suppliers screens 

// BEGIN SECTION --> End point for Manufacturers screens  	
  	.when('/mfgs', {
		templateUrl: 'views/mfgs/mfgscreate.html',
		controller: 'MfgsCtrl'
  })
  	.when('/mfgslist', {
		templateUrl: 'views/mfgs/mfgslist.html',
		controller: 'MfgsListCtrl'
  })
    .when('/editmfgs/:id', {
		templateUrl: 'views/mfgs/mfgsupdate.html',
		controller: 'mfgsUpdateCtrl'
  })	
// END SECTION --> End point for Manufacturers screens 

// BEGIN SECTION --> End point for prescribing Doctor info screens  	
  	.when('/createdoc', {
		templateUrl: 'views/doc/createdoc.html',
		controller: 'docCreateCtrl'
  })
  	.when('/doclist', {
		templateUrl: 'views/doc/listdocs.html',
		controller: 'docListCtrl'
  })
    .when('/updatedoc/:id', {
		templateUrl: 'views/doc/updatedoc.html',
		controller: 'docUpdateCtrl'
  })	
// END SECTION --> End point for prescribing Doctor info screens 

// BEGIN SECTION --> End point for buyer info screens  	
  	.when('/createbuyer', {
		templateUrl: 'views/buyer/buyercreate.html',
		controller: 'buyerCreateCtrl'
  })
  	.when('/buyerlist', {
		templateUrl: 'views/buyer/buyerlist.html',
		controller: 'buyerListCtrl'
  })
    .when('/updatebuyer/:id', {
		templateUrl: 'views/buyer/buyerupdate.html',
		controller: 'buyerUpdateCtrl'
  })	
// END SECTION --> End point for buyer info screens     

// BEGIN SECTION --> End point for Sales screens     	
    .when('/createsalesinvoice', {
		templateUrl: 'views/sales/createsalesinvoice.html',
		controller: 'createSalesInvoiceCtrl'
  }) 

   	.when('/listsales', {
		templateUrl: 'views/sales/listsalesinvoices.html',
		controller: 'listSalesInvoicesCtrl'
  })
    .when('/updatesales/:id', {
		templateUrl: 'views/sales/updatesalesinvoice.html',
		controller: 'salesUpdateCtrl'
  })
// END SECTION --> End point for Sales screens  

// BEGIN SECTION --> End point for purchase info screens  	
  	.when('/createpurchaseinvoice', {
		templateUrl: 'views/purchase/createpurchaseinvoice.html',
		controller: 'createPurchaseInvoiceCtrl'
  })
  	.when('/listpurchaseinvoices', {
		templateUrl: 'views/purchase/listpurchaseinvoices.html',
		controller: 'listPurchaseInvoicesCtrl'
  })
    .when('/updatepurchaseinvoice/:id', {
		templateUrl: 'views/purchase/udpatepurchaseinvoice.html',
		controller: 'updatePurchaseInvoiceCtrl'
  })	
// END SECTION --> End point for purchase info screens   

// BEGIN SECTION --> End point for items info screens  	
  	.when('/createItem', {
		templateUrl: 'views/items/createItem.html',
		controller: 'createItemCtrl'
  })
  	.when('/updateItem/:id', {
		templateUrl: 'views/items/updateItem.html',
		controller: 'updateItemCtrl'
  })
    .when('/listItems', {
		templateUrl: 'views/items/listItems.html',
		controller: 'listItemsCtrl'
  })	
// END SECTION --> End point for items info screens   

    .when('/search', {
		templateUrl: 'views/search/search.html',
		controller: 'searchCtrl'
  })
    .when('/items', {
		templateUrl: 'views/items/items.html',
		controller: 'ItemsCtrl'
  })
    .otherwise({
		templateUrl: 'views/sales/createsalesinvoice.html',
		controller: 'createSalesInvoiceCtrl'
  }) 
  // 	.otherwise({
		// redirectTo: '/home'
  // })
})

.config(function($datepickerProvider) {
  angular.extend($datepickerProvider.defaults, {
    dateFormat: 'd/M/yyyy',
    startWeek: 1,
	autoclose: true
  });

  toastr.options = {
    "closeButton": true,
    "timeOut": "2000",
    "showMethod": "fadeIn"
};

});

var checkLogin = function ($q, $timeout, $http, $location, $rootScope) {
	var deferred = $q.defer();

	$http.get('/login').success(function(user){
		$rootScope.errorMessage = null;
		//User is already authenticated
		if(user != 0){
			$rootScope.currentUser = user;
			deferred.resolve();
		}
		else {
			$rootScope.currentUser = undefined;
			$rootScope.errorMessage = 'You need to Log in';
			deferred.reject();
			$location.url('/login');
		}	
	});
	return deferred.promise;	
}

app.controller("NavCtrl", function($rootScope, $scope, $http, $location){
	$scope.logout = function(){
		$http.post("/logout")
			.success(function (){
				$rootScope.currentUser = null;
				$location.url("/home");
			});
	}
});


app.directive('smartFloat', function ($filter) {

var FLOAT_REGEXP_3 = /^\$?\d+(\.\d*)?$/; //Numbers like: 1123.56
var FLOAT_REGEXP   = /^[0-9]+(\.[0-9]{1,2})?$/;
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                if (FLOAT_REGEXP.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace('.', '').replace(',', '.'));
                } else {
                    ctrl.$setValidity('float', false);
                    return undefined;
                }
            });

            ctrl.$formatters.unshift(
               function (modelValue) {
                   return $filter('number')(parseFloat(modelValue) , 2);
               }
           );
        }
    };

});



var global_fullDate = new Date();
var global_twoDigitMonth = global_fullDate.getMonth()+"";if(global_twoDigitMonth.length==1)	global_twoDigitMonth="0" + global_twoDigitMonth;
var global_twoDigitDate = global_fullDate.getDate()+"";if(global_twoDigitDate.length==1)	global_twoDigitDate="0" + global_twoDigitDate;
var global_currentDate = global_twoDigitDate + "/" + global_twoDigitMonth + "/" + global_fullDate.getFullYear();//console.log(global_currentDate);