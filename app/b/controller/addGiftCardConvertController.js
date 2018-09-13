/**
 * Created by liujia on 2019/9/13.
 */
'use strict';

var app = angular.module("shopApp");

app.controller('addGiftCardConvertController',['$scope','$http','$location','$window','curr_data',function ($scope,$http,$location,$window,curr_data){
    /**
     * 获取基本信息
     */
    $scope.getByCardNo = function(){
        var cardNo = $scope.cardNo;
        if(cardNo==undefined||cardNo==''){
            return;
        }
        $http({
            method:"POST",
            url:base_url+"/giftCard/findByCardNo",
            data:{
                page:$scope.currentPage,
                size:$scope.prePage,
                cardNo:cardNo
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                console.log(data.data);
                $scope.cardBean = data.data;
            }else{
                layui.layer.alert(data.msg);
            }
        }).error(function (response,status,header) {
            layui.layer.alert('系统繁忙、稍后再试');
        });
    }

    $scope.convert = function(){
        var cardNo = $scope.cardNo;
        if(cardNo==undefined||cardNo==''){
            layui.layer.alert("请输入卡号");
            return;
        }
        var id = $scope.cardBean.id;
        if(id==undefined||id==''){
            layui.layer.alert("未查询到卡的相关信息");
            return;
        }
        if($scope.cardBean.status==1){
            layui.layer.alert("卡状态为已使用，无需兑换");
            return;
        }
        $http({
            method:"POST",
            url:base_url+"/giftCard/update",
            data:{
                cardNo:cardNo,
                status:1
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                layui.layer.alert("操作成功");
                $location.path("giftCardConvert");
            }else{
                layui.layer.alert(data.msg);
            }
        }).error(function (response,status,header) {
                layui.layer.alert('系统繁忙、稍后再试');
        });
    }
    $scope.back = function(){
        $location.path("giftCardConvert");
    }
}]);