/**
 * Created by jacktong on 2018/9/4.
 */
'use strict';

var app = angular.module("personApp");

app.controller('indexController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window,curr_data){
    $scope.user = curr_data.user;
    /**
     * 点击我的会员卡
     */
    $scope.getCard = function(){
        $location.path('mycard');
    }


}]);
