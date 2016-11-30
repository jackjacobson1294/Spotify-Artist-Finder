var app = angular.module('493Search', []);

app.controller('searchResult',[ '$scope', '$http', function($scope, $http) {
	$scope.search_result= '';
	$scope.url_query = ''
	$scope.url = '';
	$scope.results = [];
	$scope.temp_results = []
	$scope.cur_data = null
	$scope.onKeyEnter= function ($event) {
		if (event.keyCode === 13)
		{

			if($scope.search_result.length != 0)
			{
				$scope.url_query = $scope.search_result 
				$scope.url_query = $scope.url_query.split(" ");
				$scope.url_query = $scope.url_query.join('+');
				$scope.url= "https://api.spotify.com/v1/search" + "?q=" + $scope.url_query + "&type=artist";
				

				$http({
	        		method : "GET",
	        		url : $scope.url
	    		}).then(function mySuccess(response) {
	    			console.log(response);
	    			$scope.results = response.data.artists.items;
	    			if($scope.results.length != 0)
	    			{
	    				$scope.results_temp = $scope.results;
	    			}
	    			else{
	    				alert("No Artist found")
	    			}
	    			$scope.results = $scope.results_temp;

	    		}, function myError(response) {
	       			
	    		});
			}
			else
			{
				alert("No Artist found")
			}
		}

     
    };


}]);

app.controller('similarArtistsCtrl',['$scope', '$http', function($scope, $http) {
	$scope.url = '';
	$scope.sa_results = [];
	$scope.clicked = false
	$scope.simArtists= function (id) {
		$scope.clicked = true
		$scope.url = "https://api.spotify.com/v1/artists/" + id + "/related-artists"
		console.log($scope.url);
		$http({
	        	method : "GET",
	        	url : $scope.url
	    		}).then(function mySuccess(response) {
	    			console.log(response)
	    			$scope.sa_results = response.data.artists;
	    			
	    		}, function myError(response) {
	       			
	    		});
     
    };

}]);
