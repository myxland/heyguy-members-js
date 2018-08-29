/**
 * Created by jacktong on 2018/8/25.
 */
'use strict';

var app = angular.module("shopApp");

app.controller('userController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window){


    /**
     * 新增系统管理员
     */
    $scope.addUser = function(){
        var phone = $scope.phone;
        if(phone==undefined||phone==''){
            return;
        }
        if(phone.length!=11){
            layui.layer.alert("请输入正确手机号");
            return;
        }
        $http({
            method:"POST",
            url:base_url+"/user/admin/add",
            data:{
                userPhone:phone
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                $scope.phone = '';
                layui.layer.alert("成功");
            }else{
                layui.layer.alert(data.msg);
            }
        })
            .error(function (response,status,header) {
                layui.layer.alert('系统繁忙、稍后再试');
            });
    }
}]);