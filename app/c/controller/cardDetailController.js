/**
 * Created by jacktong on 2018/9/6.
 */
'use strict';

var app = angular.module("personApp");

app.controller('cardListController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window,curr_data){
    $scope.card = curr_data.card;

    /**
     * 充值
     */
    $scope.recharge = function(){
        $location.path('charge');
    }


}]);