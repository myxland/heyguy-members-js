/**
 * Created by jacktong on 2018/8/20.
 */

'use strict';

angular.module("shopApp").controller('frameController',['$scope','$http','$location','$window','curr_data',function ($scope,$http,$location,$window,curr_data) {

    if(admin_user == ""||admin_user==undefined){
        $window.location.href = "/b";
    }
    $scope.admin_user = admin_user;

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
                        type:"2"
                    },
                    cache:false,
                }).success(function (data,status) {
                    if(data.code=='0'){
                        localStorage.clear();
                        $window.location.href = "/b";
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


}]);
