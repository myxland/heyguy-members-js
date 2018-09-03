/**
 * Created by jacktong on 2018/8/25.
 */
'use strict';

var app = angular.module("shopApp");

app.controller('addDiscountController',['$scope','$http','$location','$window','curr_data',function ($scope,$http,$location,$window,curr_data){
    /**
     * 新增优惠信息
     */
    $scope.addDiscount = function(){
        var name = $scope.name;
        var fullMoney = $scope.fullMoney;
        var addMoney = $scope.addMoney;
        if(name==undefined||name==''){
            layui.layer.alert("请输入优惠名称");
            return;
        }
        if(fullMoney==undefined||fullMoney==''){
            layui.layer.alert("请输入满足的金额");
            return;
        }
        if(addMoney==undefined||addMoney==''){
            layui.layer.alert("请输入赠送的金额");
            return;
        }
        $http({
            method:"POST",
            url:base_url+"/discount/add",
            data:{
                name:name,
                fullMoney:fullMoney,
                addMoney:addMoney,
                shopId:admin_user.shopId
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                $scope.resetDiscount();
                layui.layer.alert("添加成功");
                $location.path("discount");
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
    $scope.resetDiscount = function(){
        $scope.name = '';
        $scope.fullMoney = '';
        $scope.addMoney = '';
    }
}]);