/**
 * Created by jacktong on 2018/9/6.
 */
'use strict';

var app = angular.module("personApp");

app.controller('cardDetailController',['$scope','$http','$location','$window','$rootScope',function ($scope,$http,$location,$rootScope){
    $scope.card = JSON.parse(localStorage.getItem('card_info'));
    console.log("card info:"+$scope.card);

    /**
     * 充值
     */
    $scope.recharge = function(){
        $location.path('charge');
    }

    /**
     * 个人信息
     */
    $scope.person_info = function(){
        $location.path('person_info');
    }

    /**
     * 首页
     */
    $scope.go_index = function(){
        $location.path('index');
    }

    /**
     * 点击我的会员卡
     */
    $scope.getCard = function(){
        $location.path('mycard');
    }


}]);