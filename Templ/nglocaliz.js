var app = angular.module('myApp', ["ngStorage"]);

app.controller('myctrl', function($scope, $http, $sessionStorage, $location) {
	if(!$sessionStorage.locale)
  $sessionStorage.locale = "en_US";
  $scope.language = {
    lanOptions: [
      {value: 'en_US', name: 'English'},
      {value: 'si_LK', name: 'Sinhala'},
      {value: 'ta_LK', name: 'Tamil'}
    ],
    selectedLang: {value: 'en_US', name: 'English'}
    };
  angular.element(document).ready(function () {
        $scope.loadPage();
    });
  $scope.update = function() {
		$sessionStorage.locale=$scope.language.selectedLang.value;
		$scope.loadPage();
    }
	$scope.loadPage = function() {
    var url=$location.absUrl().split('/');
    var page=url[url.length-1].split('.');
    var pageName=page[0];
	$http.get("languages/"+$sessionStorage.locale+"/"+pageName+".json")
	.then(function (response) {
      $scope.myData = response.data;
      $scope.language.selectedLang.value= $sessionStorage.locale
  });
	}
});
