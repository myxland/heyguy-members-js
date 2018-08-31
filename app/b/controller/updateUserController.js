/**
 * Created by jacktong on 2018/8/25.
 */
'use strict';

var app = angular.module("shopApp");

app.controller('updateUserController',['$scope','$http','$location','$window','curr_data',function ($scope,$http,$location,$window,curr_data){
    $scope.userBean = curr_data.userBean;
    /**
     * 优惠信息
     */
    $scope.updateUser = function(){
        var name = $scope.userBean.name;
        var fullMoney = $scope.userBean.fullMoney;
        var addMoney = $scope.userBean.addMoney;
        var name = $scope.userBean.name;
        var fullMoney = $scope.userBean.fullMoney;
        var addMoney = $scope.userBean.addMoney;
        if(name==undefined||name==''){
            return;
        }
        if(fullMoney==undefined||fullMoney==''){
            return;
        }
        if(addMoney==undefined||addMoney==''){
            return;
        }
        $http({
            method:"POST",
            url:base_url+"/user/customer/update",
            data:{
                id:$scope.discountBean.id,
                name:name,
                fullMoney:fullMoney,
                addMoney:addMoney
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                layui.layer.alert("修改成功");
                $location.path("user");
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