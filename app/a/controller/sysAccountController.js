'use strict';

var app = angular.module("adminApp");

app.controller('sysAccountController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window){

    /**
     * 新增商户按钮点击
     */
    $scope.addAccountClick = function(){
        $location.path("addAccount");
    }

}]);