/**
 * Created by jacktong on 2018/9/20.
 */
var app = angular.module("personApp");

app.controller('consumeController',['$scope','$http','$location','$window',function ($scope,$http,$location){

    /**
     * 加载消费记录
     */
    $scope.consume_list = function(){
        $http({
            method:"POST",
            url:base_url+"/consume/findByUserPhone",
            data:{
                userPhone:login_user.userPhone,
                size:9999
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                $scope.rec_list = data.data.content;
            }else{
                layer.msg(data.msg);
            }
        })
            .error(function (response,status,header) {
                layer.msg('系统繁忙、稍后再试');
            });
    }

    $scope.consume_list();

    /**
     * 点击我的会员卡
     */
    $scope.getCard = function(){
        $location.path('mycard');
    }

    /**
     * 个人信息
     */
    $scope.person_info = function(){
        $location.path('person_info');
    }

    /**
     * 首页
     */
    $scope.go_index = function(){
        $location.path('index');
    }


}]);