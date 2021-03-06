/**
 * 
 */

'use strict';

var app = angular.module('app', []);

app.controller('MyController', ['$scope',function ($scope,$timeout) {

	$scope.names = ["john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred", "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];

	app.directive('autoComplete', function($timeout) {
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

});
