

var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http',function($scope, $http )
{
	console.log("Hello World from controller");

	var refresh = function()
	{

		//route that we are going to create to get our data from
		$http.get('/contactlist').success(function(response)
		{
			console.log("I got the data I requested");
			$scope.contactlist = response;
		});

	};

	refresh();

	

	$scope.addContact = function(){
		console.log($scope.contact);
		$http.post('/contactlist', $scope.contact).success(function(response)
		{
			console.log(response);
			refresh();
		});

	};

	$scope.remove = function(id)
	{
		console.log(id);
		$http.delete('/contactlist/' + id).success(
			function(response)
			{
				refresh();
			});
	};

	$scope.edit = function(id)
	{
		console.log(id);
		// $http.get('/contactlist/' + id).success(function(response)
		// {
		// 	$scope.contact = response;
		// });

	/* 
Michael,  Great tutorial!  You didn't need to make the call to the server for edit.  You could have used the local copy of the contact with this code: 

*/
		var contact = $scope.contactlist.filter(
			function(item) {
	      		return item._id === id;
	    	})[0];
	    $scope.contact = JSON.parse(JSON.stringify(contact)); 
		
	};










	$scope.update = function(id)
	{
		console.log($scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response)
		{
			//clear the edit contact boxes
			$scope.contact = "";
			//refresh the page after everything has been updated
			 refresh();
		});
	};



	//dummy data
	// person1 = {
	// 	name: 'Tim',
	// 	email: 'tim@email1.com',
	// 	number: '(111) 111-1111'
	// };

	// person2 = {
	// 	name: 'Emily',
	// 	email: 'emily@email2.com',
	// 	number: '(222) 222-2222'
	// };

	// person2 = {
	// 	name: 'Emily',
	// 	email: 'emily@email2.com',
	// 	number: '(222) 222-2222'
	// };

	// person3 = {
	// 	name: 'John',
	// 	email: 'john@email3.com',
	// 	number: '(333) 333-3333'
	// };

	// var contactlist = [person1, person2, person3];
	// $scope.contactlist = contactlist;



}]);















