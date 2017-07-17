var app=angular.module('locApp', ['LocalStorageModule']);

app.controller('headerController',function ($rootScope,$scope,$http,localStorageService) {

    $scope.header={};


    $scope.locale=localStorageService.get("locale");
    if(!$scope.locale){
        $scope.locale="en";
        localStorageService.set('locale','en');
    }


    this.$onInit = function () {
        $scope.langChange($scope.locale);
    };

    $scope.langChange=function(locale){
        $rootScope.$broadcast('locale', locale);
        localStorageService.set('locale',locale);
        $http.get("locale_res/header/header_"+locale+".json")
            .then(function (response) {
                $scope.header=response.data;
            });

    }
})

app.controller('footerController',function ($rootScope,$scope,$http,localStorageService) {

    $scope.footer={};



    this.$onInit = function () {
        $scope.locale=localStorageService.get("locale");
        if(!$scope.locale){
            $scope.locale="en";
        }
        $http.get("locale_res/footer/footer_"+ $scope.locale+".json")
            .then(function (response) {
                console.log(response.data);
                $scope.footer=response.data;
            });
    };

    $rootScope.$on('locale', function (event, data) {
        console.log(data);
        $http.get("locale_res/footer/footer_"+data+".json")
            .then(function (response) {
                console.log(response.data);
                $scope.footer=response.data;
            });
    });


})