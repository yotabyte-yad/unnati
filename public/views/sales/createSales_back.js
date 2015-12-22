
app.controller("createSalesCtrl", function ($scope, $templateCache, $http, SalesFactory){
	//console.log('In sales controller');
	
	$scope.billModel = {};

	//Bill header
	$scope.billModel.billno = 0;
	$scope.billModel.date;
	$scope.billModel.patient;
	$scope.billModel.doctor;

	$scope.billModel.items = [];

	//Taxes
	$scope.billModel.vat5 = 0;
	$scope.billModel.vat7 = 0;

	//Bill discount
	$scope.billModel.discount = 0;

	//Bill amount
	$scope.billModel.grossAmount = 0;
	$scope.billModel.netAmount = 0;


	$scope.addItem = function(){
		
		//Add blank row only if there are less than 1 blank row remaining
		//no point in adding blank rows if 2 of them already exists
		var blank = 0;
		for(count=0;count<$scope.billModel.items.length;count++){
			if($scope.billModel.items[count].itemname === undefined) {
				blank += blank + 1
			}			
		}

		if(blank == 0){
			$scope.billModel.items.push({
	         itemname:undefined,
	         quantity:0,
	         sch: false,
	         mfg: '',
	         batch: '',
	         expdate: '',
	         price: 100,
	         amount: ''
	         });						
		}
		//console.log($scope.billModel.items);
	}

	$scope.removeItem = function(item){
		$scope.billModel.items.splice($scope.billModel.items.indexOf(item),1);
	}

	$scope.totalPrice = function(){
			var subtotal = 0;
			for(count=0;count<$scope.billModel.items.length;count++){
				subtotal += (($scope.billModel.items[count].price || 0) * ($scope.billModel.items[count].quantity || 0));
			}
			return subtotal;
	};

	$scope.grandTotal = function(){
			var grandtotal = 0;
			grandTotal = (($scope.totalPrice() || 0) - ($scope.billModel.discount || 0));
			return grandtotal;
	};
	$scope.billModel.netAmount = $scope.grandTotal() || 0;
});	
