/**
 * Created by jacktong on 2018/9/6.
 */
'use strict';

var app = angular.module("personApp");

app.controller('couponsListController',['$scope','$http','$location','$window','$rootScope',function ($scope,$http,$location){

    $scope.getCoupons = function(){
        $http({
            method:"GET",
            url:base_url+"/coupons/use/findAllByUser?user_id="+login_user.id,
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                $scope.coupons_list = data.data;
            }else{
                layer.msg(data.msg);
            }
        })
            .error(function (response,status,header) {
                layer.msg('系统繁忙、稍后再试');
            });
    }
    $scope.getCoupons();

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
