bloxApp = angular.module('BloxApp', ['ui.bootstrap','ngDraggable','ngGridster']);

bloxApp.controller('MainCtrl', ['$scope','$compile',function($scope,$compile) {
	$scope.raghu = {};
	$scope.raghu.firstName = "Raghu";
	$scope.raghu.lastName  = "K";

	$scope.soma = {};
	$scope.soma.firstName = "Soma";
	$scope.soma.lastName  = "K";
	$scope.draggableObjects = [
	                           {id:1, name:'Text Input',html:"<input>"},
	                           {id:2, name:'Label',html:"<label>LABEL<label>"},
	                           {id:3, name:'Button',html:"<button>PRESS ME<button>"},
	                           {id:4, name:'Date Selector',html:"<datepicker>"}, 
	                           {id:5, name:'UserInfo',html:"<userinfo user=raghu>"},
	                           {id:6, name:'Alert',html:"<alert>ALERT ME</alert>"},
	                           {id:7, name:'FundsTransfer',html:"<addcalendar>"}
	                           ];
	$scope.droppedObjects1 = [];
	$scope.droppedObjects2= [];

	 $scope.options = {
		        widget_margins: [10, 10],
		        widget_base_dimensions: [140, 140],
		        helper: 'clone',
		        resize: {
		          enabled: true,
		          axes: ['x', 'y', 'both'],
		          max_size: [2, 2]
		        }
		    };
		    
		    $scope.items = [
		      1,2,3
		      ];

		    $scope.addWidget = function(){
		    	$scope.items.push(xx);
			}
		    
	$scope.onSave = function(){
		console.log("Saving config");
	}
	$scope.onDropComplete=function(data,evt){

		var index = $scope.droppedObjects1.indexOf(data);
		var tag = "obj_tag_"+data.id
		if (index == -1)
			$scope.droppedObjects1.push(data);
		console.log("onDropComplete1")
		$scope.onDragInit(data);
	}
	$scope.onDragInit = function(data){
		console.log("onDragInit")
		var drag = d3.behavior.drag().on("dragstart", function(){
			//do some drag start stuff...
			console.log("DRAG START");
		})
		.on("drag", function(d,i){
			//hey we're dragging, let's update some stuff
			var x = d3.event.x;
			var y = d3.event.y;
			console.log("DRAGGING"+x+","+y);
			d3.select(this)
			.style("position","absolute")
			.transition().duration(100).style("opacity", .9)
			.style("left", (d3.event.x + 2) + "px")
			.style("top", (d3.event.y + 2) + "px")

		})
		.on("dragend", function(d){
			console.log("DRAG END");
		});
		var node = $compile(data.html)($scope);
		d3.select("#canvas").append("div").call(drag).attr("draggable","True").append(function() { return node[0]});
	}
	var inArray = function(array, obj) {
		var index = array.indexOf(obj);
	}
}]);

bloxApp.directive('userinfo', function() {
	var directive = {};

	directive.restrict = 'E';

	directive.template = "User : <b>{{user.firstName}}</b> <b>{{user.lastName}}</b>";

	directive.scope = {
			user : "=user"
	}

	return directive;
});

bloxApp.directive("mycalendar", function(){
	return {
		restrict: "E",
		template: "<datepicker></datepicker>"
	}
});

