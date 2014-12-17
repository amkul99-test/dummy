angular.module('app', ['ngGridster']);

angular.module('app').controller('MyController', [
  '$scope',
  function ($scope) {
    $scope.options = {
        widget_margins: [10, 10],
        widget_base_dimensions: [140, 140],
        helper: 'clone',
        resize: {
          enabled: true,
          axes: ['x', 'y', 'both'],
          max_size: [4, 4]
        }
    };
    
    $scope.items = [
      
      ];
    
    $scope.widgets = [
                    "My Balance","Contacts","Fund Transfer","Banner"
                    ];
    $scope.addWidget = function(d){
    	
    	$scope.items.push(d);
    	var index = $scope.widgets.indexOf(d)
    	  $scope.widgets.splice(index, 1); 
	}
  }
  ]);