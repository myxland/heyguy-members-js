/**
 * Created by jacktong on 2018/8/25.
 */
'use strict';

var app = angular.module("shopApp");

app.controller('discountController',['$scope','$http','$location','$window','curr_data',function ($scope,$http,$location,$window,curr_data){

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
    $scope.addDiscountClick = function(){
        $location.path("addDiscount");
    }

    /**
     * 查询一页优惠信息
     */
    $scope.getOnePageDiscount = function(){
        $http({
            method:"POST",
            url:base_url+"/discount/findAll",
            data:{
                page:$scope.currentPage,
                size:$scope.prePage,
                shopId:admin_user.shopId
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

    $scope.getOnePageDiscount();

    /**
     * 删除账户
     */
    $scope.deleteDiscount = function(id){

        var layer = layui.layer;
        var dialog = layui.dialog;
        dialog.confirm({
            message:'您确定删除此优惠信息？',
            success:function(){
                $http({
                    method:"POST",
                    url:base_url+"/discount/delete",
                    data:{
                        id:id
                    },
                    cache:false,
                }).success(function (data,status) {
                    if(data.code=='0'){
                        layer.closeAll();
                        $scope.getOnePageDiscount();
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

    /**
     * 修改优惠信息
     */
    $scope.updateDiscount = function(discount){
        localStorage.setItem("discountBean",JSON.stringify(discount));
        curr_data.discountBean = discount;
        $location.path('updateDiscount');
    }

    /**
     * tab切换
     * @param id
     */
    $scope.tab_click = function(id){
        $(".layui-tab-content").hide();
        $("#"+id).show();
    }

    /**
     * 加载所有优惠券配置信息
     */
    $scope.getAllCouponsConfig = function(){
        $http({
            method:"GET",
            url:base_url+"/coupons/config/findAll?shop_id="+admin_user.shopId,
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                $scope.configList = data.data;
            }else{
                layui.layer.alert(data.msg);
            }
        })
            .error(function (response,status,header) {
                layui.layer.alert('系统繁忙、稍后再试');
            });
    }

    $scope.getAllCouponsConfig();

    /**
     * 新增优惠券配置方案
     */
    $scope.addCouponsConfigClick = function(){
        $location.path('couponsConfig');
    }

    /**
     * 删除优惠券配置
     * @param id
     */
    $scope.delete_config = function(id){
        var layer = layui.layer;
        var dialog = layui.dialog;
        dialog.confirm({
            message:'您确定删除此优惠券配置信息？',
            success:function(){
                $http({
                    method:"POST",
                    url:base_url+"/coupons/config/delete",
                    data:{
                        id:id
                    },
                    cache:false,
                }).success(function (data,status) {
                    if(data.code=='0'){
                        layer.closeAll();
                        $scope.getAllCouponsConfig();
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

    /**
     * 修改状态
     * @param id
     * @param status
     */
    $scope.change_config_status = function(id,status){
        var layer = layui.layer;
        var dialog = layui.dialog;
        dialog.confirm({
            message:'您确定执行此操作？',
            success:function(){
                $http({
                    method:"POST",
                    url:base_url+"/coupons/config/changeStatus",
                    data:{
                        config_id:id,
                        status:status
                    },
                    cache:false,
                }).success(function (data,status) {
                    if(data.code=='0'){
                        layer.closeAll();
                        $scope.getAllCouponsConfig();
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