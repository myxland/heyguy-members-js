/**
 * Created by jacktong on 2018/9/4.
 */
'use strict';

var app = angular.module("personApp");

app.controller('checkController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window){


    /**
     * 提交校验
     */
    $scope.checkClick = function(){
        $location.path("index");
    }

}]);
