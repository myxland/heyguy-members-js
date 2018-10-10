/**
 * Created by jacktong on 2018/10/9.
 */
'use strict';

var app = angular.module("shopApp");

app.controller('addRealDiscountController',['$scope','$http','$location','$window',function ($scope,$http,$location){


    /**
     * 点击折扣类型
     */
    $scope.type_click = function(){
        var real_discount_type = $("input[name='realDiscountType']:checked").val();
        if(real_discount_type==1){
            $("#realdiscount_date").show();
        }else{
            $("#realdiscount_date").hide();
        }
    }

    /**
     * 新增折扣配置
     */
    $scope.addRealDiscountConfig = function(){
        var realdiscount_type = $("input[name='realDiscountType']:checked").val();
        var start_date = null;
        var end_date = null;
        if(realdiscount_type==1){
            start_date = $scope.startDate;
            end_date = $scope.endDate;
            if(start_date==undefined||start_date==''){
                layui.layer.msg("请输入开始日期");
                return;
            }
            if(end_date==undefined||end_date==''){
                layui.layer.msg("请输入结束日期");
                return;
            }
        }
        var discount_value = $scope.discountValue;
        if(discount_value==undefined||discount_value==''){
            layui.layer.msg("打折百分比");
            return;
        }
        var if_over = $("input[name='ifOver']:checked").val();

        $http({
            method:"POST",
            url:base_url+"/realdiscount/add",
            data:{
                type:realdiscount_type,
                shopId:admin_user.shopId,
                startDate:start_date,
                endDate:end_date,
                discountValue:discount_value,
                if_over:if_over
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                $scope.goBack();
                layui.layer.msg("添加成功");
            }else{
                layui.layer.msg(data.msg);
            }
        }).error(function (response,status,header) {
            layui.layer.msg('系统繁忙、稍后再试');
        });

    }

    /**
     * 返回
     */
    $scope.goBack = function(){
        $location.path('discount');
    }



}]);