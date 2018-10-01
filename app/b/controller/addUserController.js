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
                layui.layer.msg("成功");
                $location.path("user");
            }else{
                layui.layer.msg(data.msg);
            }
        }).error(function (response,status,header) {
                layui.layer.alert('系统繁忙、稍后再试');
        });
    }

    $scope.doAdd = function(){
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
            ifDiscount = "0";
        }
        layui.layer.open({
            type: 1
            ,title: '短信密码' //不显示标题栏
            ,closeBtn: true
            ,area: '800px;'
            ,shade: 0.8
            ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
            ,btn: ['发送验证码', '提交']
            ,btnAlign: 'c'
            ,moveType: 1 //拖拽模式，0或者1
            ,content: '<center><input style="margin-top: 5px;" type="text" value="" id="validCode"/></center>'
            ,yes: function(index, layero){
            //按钮【按钮一】的回调
                $scope.sendCode();
                $scope.time();
            }
            ,btn2: function(index, layero){
                $scope.checkClick();
            //return false 开启该代码可禁止点击该按钮关闭
            }
        });
    }

    $scope.re_click = function(){
        $scope.sendCode();
        $scope.time();
    }

    var wait=60;
    $scope.time = function(){
        var o = $(".layui-layer-btn0");
        if (wait == 0) {
            o.html("发送验证码");
            o.bind("click",$scope.re_click);
            wait = 60;
        } else {
            // o.attr('disabled','didsabled');
            o.unbind("click");
            o.html("重新发送(" + wait + ")");
            wait--;
            setTimeout(function() {
                    $scope.time();
                },
                1000)
        }
    }

    /**
     * 发送验证码
     */
    $scope.sendCode = function(){
        var phone_no = $scope.phoneNo;
        if(phone_no==undefined||phone_no==''||phone_no.length!=11){
            layer.msg('请输入正确手机号');
            return;
        }

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
     * 校验验证码
     */
    $scope.checkClick = function(){
        var checkCode = document.getElementById('validCode').value;
        if(checkCode==undefined||checkCode==''){
            layui.layer.alert("请输入验证码");
            return;
        }
        $http({
            method:"POST",
            url:base_url+"/base/sms/checkCode",
            data:{
                phone:$scope.phoneNo,
                code:checkCode
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                layer.msg('验证码校验成功');
                $scope.addUser();
            }else{
                layer.msg(data.msg);
            }
        }).error(function (response,status,header) {
            layer.msg('系统繁忙、稍后再试');
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

    $scope.goBack = function(){
        $location.path('user');
    }

}]);