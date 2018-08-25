/**
 * Created by jacktong on 2018/8/20.
 */

'use strict';

angular.module("adminApp").controller('mainController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window) {

    if(admin_user == ""||admin_user==undefined){
        $window.location.href = "/a";
    }


    /**
     * 注销
     */
    $scope.logout = function(){
        var layer = layui.layer;
        var dialog = layui.dialog;
        dialog.confirm({
            message:'您确定退出？',
            success:function(){
                $http({
                    method:"POST",
                    url:base_url+"/user/admin/logout",
                    data:{
                        user_phone:admin_user.userPhone,
                        type:"9"
                    },
                    cache:false,
                }).success(function (data,status) {
                    if(data.code=='0'){
                        localStorage.clear();
                        $window.location.href = "/a";
                    }else{
                        layui.layer.alert('系统繁忙，请稍后再试');
                    }
                })
                    .error(function (response,status,header) {
                        layui.layer.alert('系统繁忙、稍后再试');
                    });
            },
            cancel:function(){
            }
        })
    }

    /**
     * 新增商家按钮点击
     */
    $scope.addShopClick = function(){
        $location.path("addShop");
    }

}]);
