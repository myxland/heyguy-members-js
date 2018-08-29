/**
 * Created by jacktong on 2018/8/20.
 */

'use strict';

angular.module("adminApp").controller('mainController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window) {

    if(admin_user == ""||admin_user==undefined){
        $window.location.href = "/a";
    }

    $scope.admin_user = admin_user;

    $scope.maxSize = 5;
    $scope.totalItems = 10;
    $scope.currentPage = 1;
    $scope.prePage = 10;

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

    /**
     * 查询一页商家
     */
    $scope.getOnePageShop = function(){
        $http({
            method:"POST",
            url:base_url+"/shop/findAll",
            data:{
                page:$scope.currentPage,
                size:$scope.prePage
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                console.log(data.data);
                $scope.shop_list = data.data.content;
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

    $scope.getOnePageShop();

    /**
     * 删除店铺
     * @param id
     */
    $scope.deleteShop = function(shop_id,a_user_id){
        var layer = layui.layer;
        var dialog = layui.dialog;
        if(shop_id==undefined){
            shop_id = 0;
        }

        dialog.confirm({
            message:'您确定删除此店铺？',
            success:function(){
                $http({
                    method:"POST",
                    url:base_url+"/shop/delete",
                    data:{
                        shop_id:shop_id,
                        a_user_id:a_user_id
                    },
                    cache:false,
                }).success(function (data,status) {
                    if(data.code=='0'){
                        layer.closeAll();
                        $scope.getOnePageShop();
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

    /**
     * 冻结、解冻
     * @param id
     * @param status
     */
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
                        $scope.getOnePageShop();
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
