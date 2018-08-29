/**
 * Created by jacktong on 2018/8/25.
 */
'use strict';

var app = angular.module("shopApp");

app.controller('addRechargeController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window){

    /**
     * 新增系统管理员
     */
    $scope.addRecharge = function(){
        var cardNo = $scope.cardNo;
        var fee = $scope.fee;
        if(cardNo==undefined||cardNo==''){
            layui.layer.alert("请输入会员卡号");
            return;
        }
        if(fee==undefined||fee==''){
            layui.layer.alert("请输入充值金额");
            return;
        }
        $http({
            method:"POST",
            url:base_url+"/recharge/add",
            data:{
                cardNo:cardNo,
                fee:fee,
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                $scope.resetRecharge();
                layui.layer.alert("操作成功");
            }else{
                layui.layer.alert(data.msg);
            }
        }).error(function (response,status,header) {
                layui.layer.alert('系统繁忙、稍后再试');
            });
    }
    /**
     * 重置表单
     */
    $scope.resetRecharge = function(){
        $scope.cardNo = '';
        $scope.fee = '';
    }

}]);