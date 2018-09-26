/**
 * Created by jacktong on 2018/8/19.
 */

'use strict';


var app = angular.module('loginApp',['ui.router']);

app.factory('ResponseInterceptor', ['$q','$window', ResponseInterceptor]);

function ResponseInterceptor($q,$window) {
    return {
        request: function(config){
            layui.layer.load();
            return config;
        },
        requestError: function(err){
            return $q.reject(err);
        },
        response: function(response){
            console.log(response);
            layui.layer.closeAll('loading');
            if(response.data.CODE=='1003'){
                $window.location.href="/a";
            }else{
                return response;
            }
        },
        responseError: function(err){
            layui.layer.closeAll('loading');
            if(-1 === err.status) {
                // 远程服务器无响应
            } else if(500 === err.status) {
                // 处理各类自定义错误
            } else if(501 === err.status) {
                // ...
            }
            return $q.reject(err);
        }
    };
}


app.config(['$stateProvider','$httpProvider','$urlRouterProvider', function($stateProvider,$httpProvider,$urlRouterProvider){

    //$httpProvider.defaults.headers.common = { 'key':key,'id':shopid};
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.interceptors.push('ResponseInterceptor');
    $httpProvider.defaults.withCredentials = true;

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {

        var param = function (obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[]';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = subName;
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                        + encodeURIComponent(value) + '&';
                }
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };
        return angular.isObject(data) && String(data) !== '[object File]'
            ? param(data)
            : data;
    }];

}]);

app.controller('loginController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window) {

    $scope.login = function(){
        var username = $scope.username;
        var password = $scope.password;
        var valid_code = $scope.valid_code;
        $http({
            method:"POST",
            url:base_url+"/user/admin/login",
            data:{
                user_phone:username,
                password:password,
                type:"9",
                valid_code:valid_code
            },
            xhrFields: {  withCredentials: true },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                localStorage.setItem("adminUser",JSON.stringify(data.data));//AdminUser = data.data;
                $window.location.href = "/a/frame";
            }else{
                layui.layer.alert('账户或密码不正确');
            }
        })
            .error(function (response,status,header) {
                layui.layer.alert('系统繁忙、稍后再试');
            });





    }

}]);
