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

    /**
     * 充值记录
     */
    $scope.rechargeList = function () {
        $location.path('recharge_list');
    }

    /**
     * 消费记录
     */
    $scope.consumelist = function(){
        $location.path('consume_list');
    }

    /**
     * 积分列表
     */
    $scope.point = function(){
        $location.path('point');
    }


}]);
