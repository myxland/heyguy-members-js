/**
 * Created by jacktong on 2018/8/25.
 */
'use strict';

var app = angular.module("shopApp");

app.controller('userController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window){


    /**
     * 新增用户
     */
    /**
     * 默认分页信息
     */
    $scope.maxSize = 5;
    $scope.totalItems = 10;
    $scope.currentPage = 1;
    $scope.prePage = 10;
    /**
     * 新增优惠按钮点击
     */
    $scope.addUserClick = function(){
        $location.path("addUser");
    }

    /**
     * 查询一页优惠信息
     */
    $scope.getOnePageUser = function(){
        $http({
            method:"POST",
            url:base_url+"/user/findAll",
            data:{
                page:$scope.currentPage,
                size:$scope.prePage
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                console.log(data.data);
                $scope.discountList = data.data.content;
                $scope.totalItems = data.data.totalElements;
                $scope.currentPage = data.data.number+1;
            }else{
                layui.layer.alert(data.msg);
            }
        })
            .error(function (response,status,header) {
                layui.layer.alert('系统繁忙、稍后再试');
            });
    }

    $scope.getOnePageUser();

}]);