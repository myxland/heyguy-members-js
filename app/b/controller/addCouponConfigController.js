/**
 * Created by jacktong on 2018/8/25.
 */
'use strict';

var app = angular.module("shopApp");

app.controller('addCouponConfigController',['$scope','$http','$location','$window','curr_data',function ($scope,$http,$location){


    /**
     * 点击优惠券类型
     */
    $scope.type_click = function(){
        var coupons_type = $("input[name='couponType']:checked").val();
        if(coupons_type==1){
            $("#coupons_date").show();
        }else{
            $("#coupons_date").hide();
        }
    }

    /**
     * 新增优惠券配置信息
     */
    $scope.addCouponConfig = function(){
        var coupons_type = $("input[name='couponType']:checked").val();
        var begin_time = null;
        var end_time = null;
        if(coupons_type==1){
            begin_time = $scope.beginTime;
            end_time = $scope.endTime;
        }
        var coupons_value = $scope.coupons_value;
        var if_over = $("input[name='ifOver']:checked").val();
        var min_fee_use = $scope.min_fee_use;
        var first_give = $("input[name='firstGive']:checked").val();

        if(coupons_type==1){
            if(begin_time==undefined||begin_time==''){
                layui.layer.alert("请输入开始时间");
                return;
            }
            if(end_time==undefined||end_time==''){
                layui.layer.alert("请输入终止时间");
                return;
            }
        }

        if(coupons_value==undefined||coupons_value==''){
            layui.layer.alert("请输入优惠券面值");
            return;
        }
        if(min_fee_use==undefined||min_fee_use==''){
            layui.layer.alert("请输消费金额最低限制");
            return;
        }

        $http({
            method:"POST",
            url:base_url+"/coupons/config/add",
            data:{
                type:coupons_type,
                shopId:admin_user.shopId,
                beginTime:begin_time,
                endTime:end_time,
                coupon_value:coupons_value,
                min_use_fee:min_fee_use,
                if_over:if_over,
                first_user_give:first_give
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                $scope.resetForm();
                layui.layer.alert("添加成功");
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
    $scope.resetForm = function () {
        $scope.beginTime = "";
        $scope.endTime = "";
        $scope.coupons_value = "";
        $scope.min_fee_use = "0";
    }


    /**
     * 返回
     */
    $scope.goBack = function(){
        $location.path('discount');
    }



}]);
