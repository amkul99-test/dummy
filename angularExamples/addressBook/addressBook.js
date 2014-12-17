/**
 * 
 */
var uid = 1;


//I transform the error response, unwrapping the application dta from
//the API response payload.
function handleError( response ) {
//	The API response from the server should be returned in a
//	nomralized format. However, if the request was not handled by the
//	server (or what not handles properly - ex. server error), then we
//	may have to normalize it on our end, as best we can.
	if (
			! angular.isObject( response.data ) ||
			! response.data.message
	) {
		return( $q.reject( "An unknown error occurred." ) );
	}
//	Otherwise, use expected error message.
	return( $q.reject( response.data.message ) );
}

//I transform the successful response, unwrapping the application data
//from the API response payload.
function handleSuccess( response ) {
	console.log(response.data);
	return( response.data );
} 

function getPayees() {
	var request = $http({
		method: "get",
		url: "http://localhost:9000/api/payees",
		params: {
			action: "get"
		}
	});
	return( request.then( handleSuccess, handleError ) );
}

function ContactController($scope) {

	$scope.contacts = [
	                   { id:0, 'name': 'Viral',
	                	   'email':'hello@gmail.com',
	                	   'phone': '123-2343-44'
	                   }
	                   ];

	//$http.get('http://localhost:9000/api/payees').success(successCallback) 

	$scope.payees = getPayees();

	$scope.saveContact = function() {

		if($scope.newcontact.id == null) {
			//if this is new contact, add it in contacts array
			$scope.newcontact.id = uid++;
			$scope.contacts.push($scope.newcontact);
		} else {
			//for existing contact, find this contact using id
			//and update it.
			for(i in $scope.contacts) {
				if($scope.contacts[i].id == $scope.newcontact.id) {
					$scope.contacts[i] = $scope.newcontact;
				}
			}               
		}

		//clear the add contact form
		$scope.newcontact = {};
	}


	$scope.delete = function(id) {

		//search contact with given id and delete it
		for(i in $scope.contacts) {
			if($scope.contacts[i].id == id) {
				$scope.contacts.splice(i,1);
				$scope.newcontact = {};
			}
		}

	}


	$scope.edit = function(id) {
		//search contact with given id and update it
		for(i in $scope.contacts) {
			if($scope.contacts[i].id == id) {
				//we use angular.copy() method to create
				//copy of original object
				$scope.newcontact = angular.copy($scope.contacts[i]);
			}
		}
	}
}