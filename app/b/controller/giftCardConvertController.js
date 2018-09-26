/**
 * Created by liujia on 2019/9/13.
 */
'use strict';

var app = angular.module("shopApp");

app.controller('giftCardConvertController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window){

    /**
     * 默认分页信息
     */
    $scope.maxSize = 5;
    $scope.totalItems = 10;
    $scope.currentPage = 1;
    $scope.prePage = 10;
    /**
     * 增加
     */
    $scope.add = function(){
        $location.path("addGiftCardConvert");
    }

    /**
     * 查询
     */
    $scope.getOnePage = function(){
        $http({
            method:"POST",
            url:base_url+"/giftCard/findAll",
            data:{
                page:$scope.currentPage,
                size:$scope.prePage,
                shopId:admin_user.shopId,
                status:1
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                console.log(data.data);
                $scope.cardList = data.data.content;
                $scope.totalItems = data.data.totalElements;
                $scope.currentPage = data.data.number+1;
            }else{
                layui.layer.alert(data.msg);
            }
        }).error(function (response,status,header) {
            layui.layer.alert('系统繁忙、稍后再试');
        });
    }

    $scope.getOnePage();

    $scope.delete = function(id){
        var layer = layui.layer;
        var dialog = layui.dialog;

        dialog.confirm({
            message:'您确定删除此兑换记录？',
            success:function(){
                $http({
                    method:"POST",
                    url:base_url+"/giftCard/delete",
                    data:{
                        id:id
                    },
                    cache:false,
                }).success(function (data,status) {
                    if(data.code=='0'){
                        layer.closeAll();
                        $scope.getOnePage();
                    }else{
                        layer.alert(data.msg);
                    }
                }).error(function (response,status,header) {
                    layer.alert('系统繁忙、稍后再试');
                });
            },
            cancel:function(){
            }
        });
    }

}]);