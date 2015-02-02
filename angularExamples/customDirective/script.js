/**
 * 
 */
var app = angular.module("app", [
                                                 "ngRoute",
                                                 "ngAnimate"
                                                 ]);
app.config(function($routeProvider) {
	$routeProvider.
	when("/page1", {
		templateUrl: "page1.html",
		controller: "Page1Ctrl"
	}).
	when("/page2", {
		templateUrl: "page2.html",
		controller: "Page2Ctrl"
	}).
	otherwise({
		redirectTo: "/page1"
	});
});

app.controller("ViewCtrl", function($scope) {
	$scope.$on("$routeChangeSuccess", function(event, current, previous) {
		var previousCtrl = previous && previous.$$route && previous.$$route.controller;
		if (previousCtrl === "Page1Ctrl") {
			$scope.animationStyle = "slideLeft";
		} else if (previousCtrl === "Page2Ctrl") {
			$scope.animationStyle = "slideRight";
		}
		$scope.$apply();
	});
});



app.controller("Page1Ctrl", function($scope) {
	$scope.payees = [ "john", "bill", "charlie", "robert", "alban",
	                  "oscar", "marie", "celine", "brad", "drew", "rebecca",
	                  "michel", "francis", "jean", "paul", "pierre", "nicolas",
	                  "alfred", "gerard", "louis", "albert", "edouard", "benoit",
	                  "guillaume", "nicolas", "joseph" ];

	$scope.accounts = [ {
		text : 'SB Account',
		value : 'SB',
		iconCls : 'someicon',
		Bal : '12,345.00 INR'
	}, {
		text : 'Ready Credit Account',
		value : 'RCB',
		iconCls : 'someicon',
		Bal : '36,345.00 INR'
	}, {
		text : 'Current Account',
		value : 'CA',
		iconCls : 'someicon',
		Bal : '65,345.00 INR'
	}, {
		divider : true
	}, {
		text : 'Option4',
		href : 'http://www.google.com'
	} ];

	$scope.transferFrom = {
			text : "Choose Account"
	};
});

app.controller("Page2Ctrl", function($scope) {
});