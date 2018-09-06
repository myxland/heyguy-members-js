/**
 * Created by jacktong on 2018/9/6.
 */
'use strict';

var app = angular.module("personApp");

app.controller('personInfoController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window,curr_data){

    /**
     * 加载用户信息
     */
    $scope.findUser = function(){
            $http({
                method:"POST",
                url:base_url+"/customer/findOneById",
                data:{
                    userId:login_user.id
                },
                cache:false,
            }).success(function (data,status) {
                if(data.code=='0'){
                    $scope.user = data.data;
                }else{
                    layer.msg(data.msg);
                }
            })
                .error(function (response,status,header) {
                    layer.msg('系统繁忙、稍后再试');
                });
        }

    $scope.findUser();

}]);