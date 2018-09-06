/**
 * Created by jacktong on 2018/9/6.
 */
var app = angular.module("personApp");

app.controller('rechargeController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window,curr_data){

    /**
     * 加载充值记录
     */
    $scope.recharge_list = function(){
        $http({
            method:"POST",
            url:base_url+"/recharge/findByUserPhone",
            data:{
                userPhone:login_user.userPhone,
                size:9999
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                $scope.rec_list = data.data;
            }else{
                layer.msg(data.msg);
            }
        })
            .error(function (response,status,header) {
                layer.msg('系统繁忙、稍后再试');
            });
    }

    $scope.recharge_list();


}]);