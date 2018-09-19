/**
 * Created by jacktong on 2018/8/20.
 */

'use strict';

angular.module("shopApp").controller('mainController',['$scope','$http','$location','$window','curr_data',function ($scope,$http,$location,$window,curr_data) {

    if(admin_user == ""||admin_user==undefined){
        $window.location.href = "/b";
    }
    $scope.admin_user = admin_user;

    /**
     * 查询消费金额信息
     */
    $scope.getConsumeFeeList = function(){
        $http({
            method:"POST",
            url:base_url+"/user/customer/findAllUser",
            data:{
                page:$scope.currentPage,
                size:$scope.prePage,
                shopId:admin_user.shopId
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                console.log(data.data);
                $scope.userList = data.data.content;
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

    $scope.getConsumeFeeList();

    /**
     * 查询消费次数信息
     */
    $scope.getConsumeCountList = function(){
        $http({
            method:"POST",
            url:base_url+"/user/customer/findAllUser",
            data:{
                page:$scope.currentPage,
                size:$scope.prePage,
                shopId:admin_user.shopId
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                console.log(data.data);
                $scope.userList = data.data.content;
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

    $scope.getConsumeCountList();

    /**
     * 查询充值金额信息
     */
    $scope.getRechargeFeeList = function(){
        $http({
            method:"POST",
            url:base_url+"/user/customer/findAllUser",
            data:{
                page:$scope.currentPage,
                size:$scope.prePage,
                shopId:admin_user.shopId
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                console.log(data.data);
                $scope.userList = data.data.content;
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

    $scope.getRechargeFeeList();

    /**
     * 查询会员总数
     */
    $scope.getUserTotal = function(){
        $http({
            method:"POST",
            url:base_url+"/user/customer/findAllUser",
            data:{
                page:$scope.currentPage,
                size:$scope.prePage,
                shopId:admin_user.shopId
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                console.log(data.data);
                $scope.userList = data.data.content;
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

    $scope.getUserTotal();

    /**
     * 查询充值总金额
     */
    $scope.getRechargeFeeTotal = function(){
        $http({
            method:"POST",
            url:base_url+"/user/customer/findAllUser",
            data:{
                page:$scope.currentPage,
                size:$scope.prePage,
                shopId:admin_user.shopId
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                console.log(data.data);
                $scope.userList = data.data.content;
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

    $scope.getRechargeFeeTotal();

    /**
     * 查询今日消费
     */
    $scope.getConsumeFeeToday = function(){
        $http({
            method:"POST",
            url:base_url+"/user/customer/findAllUser",
            data:{
                page:$scope.currentPage,
                size:$scope.prePage,
                shopId:admin_user.shopId
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                console.log(data.data);
                $scope.userList = data.data.content;
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

    $scope.getConsumeFeeToday();

}]);
