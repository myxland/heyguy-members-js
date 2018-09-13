/**
 * Created by jacktong on 2018/9/4.
 */
'use strict';

var app = angular.module("personApp");

app.controller('checkController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window,curr_data){

    /**
     * 根据code获取access_token,openid
     */
    $scope.getAccessToken = function(){
        $http({
            method:"POST",
            url:base_url+"/2c/wechat/getToken",
            data:{
                acc_code:code
            },
            cache:false,
        }).success(function (data,status) {
            var d = JSON.parse(data.data);
            $scope.access_token = d.access_token;
            $scope.refresh_token = d.refresh_token;
            $scope.openid = d.openid;
            curr_data.openid = d.openid;
        }).error(function (response,status,header,errcode,errmsg) {
            layer.msg('提示','数据加载异常'+response+"status:"+status+","+errcode+","+errmsg);
        });
    }

    $scope.getAccessToken();

    var wait=60;
    $scope.send_code = function(){
        var phone_no = $scope.phone_no;
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
        })
            .error(function (response,status,header) {
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
        var phone = $scope.phone_no;
        if(phone==undefined||phone==''){
            layer.msg('请输入正确手机号');
            return;
        }
        var check_code = $scope.check_code;
        if(check_code==undefined||check_code==''){
            layer.msg('请输入正确验证码');
            return;
        }
        //测试使用
        // $location.path('index');
        // return;
        //测试使用

        $http({
            method:"POST",
            url:base_url+"/base/sms/checkCode",
            data:{
                phone:phone,
                code:check_code
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                $scope.check_user_info();
            }else{
                layer.msg(data.msg);
            }
        })
            .error(function (response,status,header) {
                layer.msg('系统繁忙、稍后再试');
            });
    }

    /**
     * 校验个人账户信息是否存在
     */
    $scope.check_user_info = function(){
        $http({
            method:"POST",
            url:base_url+"/2c/wechat/checkPhone",
            data:{
                phone_no:$scope.phone_no,
                openid:$scope.openid,
                access_token:$scope.access_token
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                curr_data.user = data.data;
                login_user = data.data;
                $location.path('index');
            }else{
                layer.msg(data.msg);
            }
        })
            .error(function (response,status,header) {
                layer.msg('系统繁忙、稍后再试');
            });
    }

}]);
