/**
 * 
 */

myapp = angular.module("myapp", []);

myapp.directive('userinfo', function() {
    var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "template.html";

    return directive;
});

myapp.controller('MyController', function($scope) {
	
	$scope.names = ["john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred", "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];
	
});

function DefaultCtrl($scope) {
	$scope.names = ["john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred", "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];
}

angular.module('MyModule', []).directive('autoComplete', function($timeout) {
	return function(scope, iElement, iAttrs) {
		iElement.autocomplete({
			source: scope[iAttrs.uiItems],
			select: function() {
				$timeout(function() {
					iElement.trigger('input');
				}, 0);
			}
		});
	};
});