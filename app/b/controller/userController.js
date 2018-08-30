/**
 * Created by jacktong on 2018/8/25.
 */
'use strict';

var app = angular.module("shopApp");

app.controller('userController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window){

    /**
     * 新增用户
     */
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
    $scope.addUserClick = function(){
        $location.path("addUser");
    }

    /**
     * 查询一页优惠信息
     */
    $scope.getOnePageUser = function(){
        $http({
            method:"POST",
            url:base_url+"/user/customer/findAllUser",
            data:{
                page:$scope.currentPage,
                size:$scope.prePage
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                console.log(data.data);
                $scope.userList = data.data.content;
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

    $scope.getOnePageUser();

    /**
     * 删除账户
     */
    $scope.deleteUser = function(id){

        var layer = layui.layer;
        var dialog = layui.dialog;

        dialog.confirm({
            message:'您确定删除此账户？',
            success:function(){
                $http({
                    method:"POST",
                    url:base_url+"/user/customer/delete",
                    data:{
                        id:id
                    },
                    cache:false,
                }).success(function (data,status) {
                    if(data.code=='0'){
                        layer.closeAll();
                        $scope.getOnePageUser();
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

    $scope.changeStatus = function(id,status){
        var msg;
        if(status==1){
            msg = "确定要解冻？";
        }
        if(status==0){
            msg = "确定要冻结？";
        }

        var layer = layui.layer;
        var dialog = layui.dialog;

        dialog.confirm({
            message:msg,
            success:function(){
                $http({
                    method:"POST",
                    url:base_url+"/user/customer/changeStatus",
                    data:{
                        id:id,
                        status:status
                    },
                    cache:false,
                }).success(function (data,status) {
                    if(data.code=='0'){
                        layer.closeAll();
                        $scope.getOnePageUser();
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