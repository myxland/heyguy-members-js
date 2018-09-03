/**
 * Created by jacktong on 2018/8/25.
 */
'use strict';

var app = angular.module("shopApp");

app.controller('addUserController',['$scope','$http','$location','$window','curr_data',function ($scope,$http,$location,$window,curr_data){

    /**
     * 新增会员
     */
    $scope.addUser = function(){
        var realName = $scope.realName;
        if(realName==undefined||realName==''){
            return;
        }
        var phoneNo = $scope.phoneNo;
        if(phoneNo==undefined||phoneNo==''){
            return;
        }
        if(phoneNo.length!=11){
            layui.layer.alert("请输入正确手机号");
            return;
        }
        var cardNo = $scope.cardNo;
        if(cardNo==undefined||cardNo==''){
            return;
        }
        var cardType = $("input[name='cardType'][checked]").val();
        var fee = $scope.fee;
        if(fee==undefined||fee==''){
            return;
        }
        var ifDiscount = "1";
        if ($('#ifDiscount').is(":checked")) {
            ifDiscount = "1"
        }else{
            ifDiscount = "0"
        }
        $http({
            method:"POST",
            url:base_url+"/user/customer/add",
            data:{
                realName:realName,
                phoneNo:phoneNo,
                cardNo:cardNo,
                cardType:cardType,
                fee:fee,
                ifDiscount:ifDiscount,
                shopId:admin_user.shopId
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                $scope.phone = '';
                layui.layer.alert("成功");
                $location.path("user");
            }else{
                layui.layer.alert(data.msg);
            }
        }).error(function (response,status,header) {
                layui.layer.alert('系统繁忙、稍后再试');
        });
    }

    /**
     * 重置表单
     */
    $scope.resetUser = function(){
        $scope.realName = '';
        $scope.phoneNo = '';
        $scope.cardNo = '';
        $scope.fee = '';
    }

}]);