/**
 * Created by jacktong on 2018/9/6.
 */
'use strict';

var app = angular.module("personApp");

app.controller('cardListController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window,curr_data){
    $scope.user = curr_data.user;

    /**
     * 查询会员卡详细
     * @param card_id
     */
    $scope.getCardDetail = function(card_id){
        $http({
            method:"POST",
            url:base_url+"/card/findById",
            data:{
                id:card_id
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                curr_data.card = data.data;
                $location.path('card_detail');
            }else{
                layer.msg(data.msg);
            }
        })
            .error(function (response,status,header) {
                layer.msg('系统繁忙、稍后再试');
            });
    }

}]);