'use strict';

var app = angular.module("adminApp");

app.controller('sysAccountController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window){

    $scope.maxSize = 5;
    $scope.totalItems = 10;
    $scope.currentPage = 1;
    $scope.prePage = 10;


    /**
     * 新增商户按钮点击
     */
    $scope.addAccountClick = function(){
        $location.path("addAccount");
    }

    /**
     * 查询一页管理员账户
     */
    $scope.getOnePageAccount = function(){
        $http({
            method:"POST",
            url:base_url+"/user/admin/findAll",
            data:{
                page:$scope.currentPage,
                size:$scope.prePage
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                console.log(data.data);
                $scope.account_list = data.data.content;
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

    $scope.getOnePageAccount();

    /**
     * 删除账户
     */
    $scope.deleteAccount = function(id){

        var layer = layui.layer;
        var dialog = layui.dialog;

        dialog.confirm({
            message:'您确定删除此账户？',
            success:function(){
                $http({
                    method:"POST",
                    url:base_url+"/user/admin/delete",
                    data:{
                        id:id
                    },
                    cache:false,
                }).success(function (data,status) {
                    if(data.code=='0'){
                        layer.closeAll();
                        $scope.getOnePageAccount();
                    }else{
                        layer.alert(data.msg);
                    }
                })
                    .error(function (response,status,header) {
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
                    url:base_url+"/user/admin/changeStatus",
                    data:{
                        id:id,
                        status:status
                    },
                    cache:false,
                }).success(function (data,status) {
                    if(data.code=='0'){
                        layer.closeAll();
                        $scope.getOnePageAccount();
                    }else{
                        layer.alert(data.msg);
                    }
                })
                    .error(function (response,status,header) {
                        layer.alert('系统繁忙、稍后再试');
                    });
            },
            cancel:function(){
            }
        });
    }





}]);
