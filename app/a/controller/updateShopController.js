/**
 * Created by jacktong on 2018/8/30.
 */
'use strict';

var app = angular.module("adminApp");

app.controller('updateShopController',['$scope','$http','$location','$window','curr_data',function ($scope,$http,$location,$window,curr_data){
    $scope.au = curr_data.admin_user;

    /**
     * 更新店铺
     */
    $scope.doUpdateShop = function(){
        var shop_name = $scope.au.shop.shopName;
        if(shop_name==undefined||shop_name == ''){
            return;
        }
        var shop_addr = $scope.au.shop.shopAddr;
        if(shop_addr==undefined || shop_addr == ''){
            return;
        }

        var shop_chain = $scope.au.ifChain;
        if(shop_chain==undefined || shop_chain == ''){
            layui.layer.alert("请选择是否连锁店铺");
            return;
        }

        var shop_owner = $scope.au.shop.ownerName;
        if(shop_owner==undefined || shop_owner == ''){
            return;
        }
        var shop_owner_phone = $scope.au.shop.ownerPhone;
        if(shop_owner_phone==undefined || shop_owner_phone == ''){
            return;
        }
        var shop_area = $scope.au.shop.area;
        var fd = new FormData();
        //fd.append("userPhone",shop_account);
        fd.append("shopName",shop_name);
        fd.append("ifChain",shop_chain);
        fd.append("contanct",shop_owner_phone);
        fd.append("ownerName",shop_owner);
        fd.append("shopAddr",shop_addr);
        if(shop_area!=undefined){
            fd.append("area",shop_area);
        }
        fd.append("ownerPhone",shop_owner_phone);
        fd.append("a_user_id",$scope.au.id);
        fd.append("shop_id",$scope.au.shop.id);
        $http({
            method:"POST",
            url:base_url+"/shop/update",
            data:fd,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (data,status) {
            if(data.code=='0'){
                layui.layer.alert("成功");
                $location.path("main");
            }else{
                layer.alert(data.msg);
            }
        })
            .error(function (response,status,header) {
                layer.alert('系统繁忙、稍后再试');
            });
    }

    /**
     * 返回
     */
    $scope.goBack = function(){
        $location.path("main");
    }

}]);