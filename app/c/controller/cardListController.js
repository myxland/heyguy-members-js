/**
 * Created by jacktong on 2018/9/6.
 */
'use strict';

var app = angular.module("personApp");

app.controller('cardListController',['$scope','$http','$location','$window','$rootScope',function ($scope,$http,$location,$window,$rootScope){
    $scope.user = login_user;

    /**
     * 查询会员卡详细
     * @param card_id
     */
    $scope.getCardDetail = function(card_id){
        $http({
            method:"POST",
            url:base_url+"/card/findById",
            data:{
                id:card_id
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                localStorage.setItem('card_info',JSON.stringify(data.data));
                $location.path('card_detail');
            }else{
                layer.msg(data.msg);
            }
        })
            .error(function (response,status,header) {
                layer.msg('系统繁忙、稍后再试');
            });
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

}]);
