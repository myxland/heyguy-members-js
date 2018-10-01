/**
 * Created by jacktong on 2018/8/25.
 */
'use strict';

var app = angular.module("shopApp");

app.controller('addConsumeController',['$scope','$http','$location','$window','curr_data',function ($scope,$http,$location,$window,curr_data){
    $scope.coupons_value;

    /**
     * 查询用户信息
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
            }else{
                layui.layer.alert(data.msg);
            }
        }).error(function (response,status,header) {
            layui.layer.alert('系统繁忙、稍后再试');
        });
    }

    $scope.addConsume = function(){
        var coupons_id = $("input[name='user_coupons']:checked").val();
        if(coupons_id==undefined){
            coupons_id = '';
        }
        var fee = $scope.fee;
        if(fee==undefined||fee==''){
            layui.layer.alert("请输入消费金额");
            return;
        }
        if(parseFloat($scope.real_pay_fee)>parseFloat($scope.userBean.card.balance)){
            layui.layer.alert("余额不足");
            return;
        }
        $http({
            method:"POST",
            url:base_url+"/consume/add",
            data:{
                payFee:$scope.real_pay_fee,
                userPhone:$scope.userBean.userPhone,
                cardNo:$scope.userBean.card.cardNo,
                shopId:$scope.userBean.card.shopId,
                user_coupons_id:coupons_id,
                should_pay:fee
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
        var phone_no = $scope.userBean.userPhone;
        if(phone_no==undefined||phone_no==''||phone_no.length!=11){
            layer.msg('请输入正确手机号');
            return;
        }

         $scope.time();

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
        var fee = $scope.fee;
        if(fee==undefined||fee==''){
            layui.layer.alert("请输入消费金额");
            return;
        }

        if(parseFloat($scope.real_pay_fee)>parseFloat($scope.userBean.card.balance)){
            layui.layer.alert("余额不足");
            return;
        }
        var userPhone = $scope.userBean.userPhone;
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


    $scope.goBack = function(){
        $location.path('consume');
    }

    $scope.coupons_click = function(v){
        $scope.coupons_value = v;
        $scope.shop_pay_fee_change();
    }

    $scope.shop_pay_fee_change = function(){
        var should_pay = $scope.fee;
        if(should_pay!=undefined){
            if($scope.coupons_value!=undefined){
                $scope.real_pay_fee = parseFloat(should_pay-$scope.coupons_value).toFixed(2)>0?parseFloat(should_pay-$scope.coupons_value).toFixed(2):0;
            }else{
                $scope.real_pay_fee = should_pay;
            }
        }

    }

}]);