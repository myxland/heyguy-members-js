/**
 * Created by jacktong on 2018/8/25.
 */
'use strict';

var app = angular.module("shopApp");

app.controller('consumeController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window){


    /**
     * 默认分页信息
     */
    $scope.maxSize = 5;
    $scope.totalItems = 10;
    $scope.currentPage = 1;
    $scope.prePage = 10;
    // /**
    //  * 充值按钮点击
    //  */
    // $scope.addRechargeClick = function(){
    //     $location.path("addRecharge");
    // }

    /**
     * 查询一页充值信息
     */
    $scope.getOnePageConsume = function(){
        var userPhone = $scope.userPhone;
        // alert(userPhone);
        if(userPhone==undefined||userPhone==''){
            // alert("1")
            $http({
                method:"POST",
                url:base_url+"/consume/findAll",
                data:{
                    page:$scope.currentPage,
                    size:$scope.prePage
                },
                cache:false,
            }).success(function (data,status) {
                if(data.code=='0'){
                    console.log(data.data);
                    $scope.consumeList = data.data.content;
                    $scope.totalItems = data.data.totalElements;
                    $scope.currentPage = data.data.number+1;
                }else{
                    layui.layer.alert(data.msg);
                }
            }).error(function (response,status,header) {
                layui.layer.alert('系统繁忙、稍后再试');
            });
        }
        if(userPhone!=undefined&&userPhone!=''){
            // alert("2")
            $http({
                method:"POST",
                url:base_url+"/consume/findByUserPhone",
                data:{
                    page:$scope.currentPage,
                    size:$scope.prePage,
                    userPhone:userPhone
                },
                cache:false,
            }).success(function (data,status) {
                if(data.code=='0'){
                    console.log(data.data);
                    $scope.consumeList = data.data.content;
                    $scope.totalItems = data.data.totalElements;
                    $scope.currentPage = data.data.number+1;
                }else{
                    layui.layer.alert(data.msg);
                }
            }).error(function (response,status,header) {
                layui.layer.alert('系统繁忙、稍后再试');
            });
        }




        // else{
        //     alert("2")
        //     $http({
        //         method:"POST",
        //         url:base_url+"/recharge/findByUserPhone",
        //         data:{
        //             page:$scope.currentPage,
        //             size:$scope.prePage,
        //             userPhone:userPhone
        //         },
        //         cache:false,
        //     }).success(function (data,status) {
        //         if(data.code=='0'){
        //             console.log(data.data);
        //             $scope.rechargeList = data.data.content;
        //             $scope.totalItems = data.data.totalElements;
        //             $scope.currentPage = data.data.number+1;
        //         }else{
        //             layui.layer.alert(data.msg);
        //         }
        //     }).error(function (response,status,header) {
        //         layui.layer.alert('系统繁忙、稍后再试');
        //     });
        // }

    }

    $scope.getOnePageConsume();

}]);