/**
 * Created by jacktong on 2018/8/25.
 */
'use strict';

var app = angular.module("shopApp");

app.controller('addConsumeController',['$scope','$http','$location','$window','curr_data',function ($scope,$http,$location,$window,curr_data){
    /**
     * 新增消费信息
     */

    $scope.getConsumeByPhone = function(){
        var userPhone = $scope.userPhone;
        if(userPhone==undefined||userPhone==''){
            return;
        }
        $http({
            method:"POST",
            url:base_url+"/user/customer/findOneByUserPhone",
            data:{
                page:$scope.currentPage,
                size:$scope.prePage,
                userPhone:userPhone
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                console.log(data.data);
                $scope.userBean = data.data;
                // $scope.totalItems = data.data.totalElements;
                // $scope.currentPage = data.data.number+1;
            }else{
                layui.layer.alert(data.msg);
            }
        }).error(function (response,status,header) {
            layui.layer.alert('系统繁忙、稍后再试');
        });
    }

    $scope.addConsume = function(){
        var fee = $scope.fee;
        if(fee==undefined||fee==''){
            layui.layer.alert("请输入消费金额");
            return;
        }
        if(fee>$scope.userBean.balance){
            layui.layer.alert("余额不足");
            return;
        }
        $http({
            method:"POST",
            url:base_url+"/consume/add",
            data:{
                payFee:fee,
                userPhone:$scope.userBean.userPhone,
                cardNo:$scope.userBean.card.cardNo
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                layui.layer.alert("操作成功");
                $location.path("consume");
            }else{
                layui.layer.alert(data.msg);
            }
        }).error(function (response,status,header) {
                layui.layer.alert('系统繁忙、稍后再试');
            });
    }

}]);