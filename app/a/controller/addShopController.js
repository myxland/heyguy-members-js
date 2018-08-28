/**
 * Created by jacktong on 2018/8/25.
 */
'use strict';

var app = angular.module("adminApp");

app.controller('addShopController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window){
    $scope.shop_chain = "0";

    /**
     * 新增商户
     */
    $scope.addShop = function(){
        var shop_name = $scope.shop_name;
        if(shop_name==undefined||shop_name == ''){
            return;
        }
        var shop_addr = $scope.shop_addr;
        if(shop_addr==undefined || shop_addr == ''){
            return;
        }
        var shop_account = $scope.shop_account;
        if(shop_account==undefined || shop_account == ''){
            return;
        }
        var shop_chain = $scope.shop_chain;
        if(shop_chain==undefined || shop_chain == ''){
            layui.layer.alert("请选择是否连锁店铺"+shop_chain);
            return;
        }

        var shop_owner = $scope.shop_owner;
        if(shop_owner==undefined || shop_owner == ''){
            return;
        }
        var shop_owner_phone = $scope.shop_owner_phone;
        if(shop_owner_phone==undefined || shop_owner_phone == ''){
            return;
        }
        var shop_area = $scope.shop_area;
        var fd = new FormData();
        fd.append("userPhone",shop_account);
        fd.append("shopName",shop_name);
        fd.append("ifChain",shop_chain);
        fd.append("contanct",shop_owner_phone);
        fd.append("ownerName",shop_owner);
        fd.append("shopAddr",shop_addr);
        fd.append("area",shop_area);
        fd.append("ownerPhone",shop_owner_phone);

        $http({
            method:"POST",
            url:base_url+"/shop/add",
            data:fd,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (data,status) {
            if(data.code=='0'){
                $scope.reset();
                layui.layer.alert("成功");
            }else{
                layui.layer.alert(data.msg);
            }
        })
            .error(function (response,status,header) {
                layui.layer.alert('系统繁忙、稍后再试');
            });

    }

    /**
     * 重置表单
     */
    $scope.reset = function(){
        $scope.shop_name = "";
        $scope.shop_addr = "";
        $scope.shop_account = "";
        $scope.shop_owner = "";
        $scope.shop_owner_phone = "";
        $scope.shop_area = "";
        $scope.shop_chain = "0";
    }


}]);
