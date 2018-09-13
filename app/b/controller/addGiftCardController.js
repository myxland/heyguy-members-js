/**
 * Created by liujia on 2019/9/13.
 */
'use strict';

var app = angular.module("shopApp");

app.controller('addGiftCardController',['$scope','$http','$location','$window','curr_data',function ($scope,$http,$location,$window,curr_data){

    /**
     * 新增
     */
    $scope.add = function(){
        var cardNo = $scope.cardNo;
        if(cardNo==undefined||cardNo==''){
            return;
        }
        var remark = $scope.remark;
        $http({
            method:"POST",
            url:base_url+"/giftCard/add",
            data:{
                cardNo:cardNo,
                remark:remark,
                status:0,
                shopId:admin_user.shopId
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                layui.layer.alert("成功");
                $location.path("giftCard");
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
    $scope.reset = function(){
        $scope.cardNo = '';
        $scope.remark = '';
    }

}]);