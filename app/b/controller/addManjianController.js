/**
 * Created by jacktong on 2018/10/9.
 */
'use strict';

var app = angular.module("shopApp");

app.controller('addManjianController',['$scope','$http','$location','$window',function ($scope,$http,$location){

    /**
     * 点击满减类型
     */
    $scope.type_click = function(){
        var manjian_type = $("input[name='manjianType']:checked").val();
        if(manjian_type==1){
            $("#manjian_date").show();
        }else{
            $("#manjian_date").hide();
        }
    }

    /**
     * 新增
     */
    $scope.addManjianConfig = function(){
        var manjian_type = $("input[name='manjianType']:checked").val();
        var start_date = null;
        var end_date = null;
        if(manjian_type==1){
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
        var man = $scope.man;
        if(man==undefined||man==''){
            layui.layer.msg("请输入满值");
            return;
        }
        var jian = $scope.jian;
        if(jian==undefined||man==''){
            layui.layer.msg("请输入减值");
            return;
        }
        var if_over = $("input[name='ifOver']:checked").val();

        $http({
            method:"POST",
            url:base_url+"/manjian/add",
            data:{
                type:manjian_type,
                shopId:admin_user.shopId,
                startDate:start_date,
                endDate:end_date,
                man:man,
                jian:jian,
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