/**
 * Created by jacktong on 2018/8/25.
 */
'use strict';

var app = angular.module("shopApp");

app.controller('addConsumeController',['$scope','$http','$location','$window','curr_data',function ($scope,$http,$location,$window,curr_data){
    /**
     * 新增消费信息
     */

    $scope.getConsumeByPhone = function(){
        var userPhone = $scope.userPhone;
        if(userPhone==undefined||userPhone==''){
            return;
        }
        $http({
            method:"POST",
            url:base_url+"/user/customer/findOneByUserPhone",
            data:{
                page:$scope.currentPage,
                size:$scope.prePage,
                userPhone:userPhone,
                shopId:admin_user.shopId
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                console.log(data.data);
                $scope.userBean = data.data;
                // $scope.totalItems = data.data.totalElements;
                // $scope.currentPage = data.data.number+1;
            }else{
                layui.layer.alert(data.msg);
            }
        }).error(function (response,status,header) {
            layui.layer.alert('系统繁忙、稍后再试');
        });
    }

    $scope.addConsume = function(){
        var fee = $scope.fee;
        if(fee==undefined||fee==''){
            layui.layer.alert("请输入消费金额");
            return;
        }
        if(fee>$scope.userBean.balance){
            layui.layer.alert("余额不足");
            return;
        }
        $http({
            method:"POST",
            url:base_url+"/consume/add",
            data:{
                payFee:fee,
                userPhone:$scope.userBean.userPhone,
                cardNo:$scope.userBean.card.cardNo,
                shopId:$scope.userBean.card.shopId
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                layui.layer.alert("操作成功");
                $location.path("consume");
            }else{
                layui.layer.alert(data.msg);
            }
        }).error(function (response,status,header) {
                layui.layer.alert('系统繁忙、稍后再试');
            });
    }

    var wait=60;
    $scope.sendCode = function(){
        var phone_no = $scope.userPhone;
        if(phone_no==undefined||phone_no==''||phone_no.length!=11){
            layer.msg('请输入正确手机号');
            return;
        }

        // $scope.time();

        $http({
            method:"POST",
            url:base_url+"/base/sms/sendCheckCode",
            data:{
                phone:phone_no
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                layer.msg("发送成功");
            }else{
                layer.msg(data.msg);
            }
        }).error(function (response,status,header) {
            layer.msg('系统繁忙、稍后再试');
        });
    }

    /**
     * 验证码按钮倒计时
     */
    $scope.time = function(){
        var o = $("#send_btn");
        if (wait == 0) {
            o.attr('disabled','didsabled');
            o.val('获取验证码');
            wait = 60;
        } else {
            o.attr('disabled','didsabled');
            o.val("重新发送(" + wait + ")");
            wait--;
            setTimeout(function() {
                $scope.time();
            },
            1000)
        }
    }

    /**
     * 提交校验验证码
     */
    $scope.checkClick = function(){
        var userPhone = $scope.userPhone;
        if(userPhone==undefined||userPhone==''){
            return;
        }
        var checkCode = $scope.checkCode;
        if(checkCode==undefined||checkCode==''){
            layui.layer.alert("请输入验证码");
            return;
        }
        $http({
            method:"POST",
            url:base_url+"/base/sms/checkCode",
            data:{
                phone:userPhone,
                code:checkCode
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                $scope.addConsume();
            }else{
                layer.msg(data.msg);
            }
        }).error(function (response,status,header) {
            layer.msg('系统繁忙、稍后再试');
        });
    }
}]);