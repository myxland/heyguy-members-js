/**
 * Created by jacktong on 2018/8/19.
 */

'use strict';
var temp_user = localStorage.getItem('login_user');
var login_user = JSON.parse(temp_user);

var app = angular.module('personApp',['ui.router','oc.lazyLoad','ui.bootstrap']);

app.factory('ResponseInterceptor', ['$q','$window', ResponseInterceptor]);

app.service("curr_data", [function(){
    this.user;
    this.card;
    this.openid = "";
}])

var layer = layui.layer;

function ResponseInterceptor($q,$window) {
    return {
        request: function(config){
            if(layer!=undefined){
                layer.load();
            }
            return config;
        },
        requestError: function(err){
            return $q.reject(err);
        },
        response: function(response){
            if(layer!=undefined){
                layer.closeAll('loading');
            }
            console.log(response);
            if(response.data=='1003'){
                layer.msg('请验证手机号');
                localStorage.removeItem('login_user');
                $window.location.href="/c";
            } else if(response.data=='1004'){
                layer.msg('超时，请验证手机号');
                localStorage.removeItem('login_user');
                $window.location.href="/c";
            } else{
                return response;
            }
        },
        responseError: function(err){
            if(layer!=undefined){
                layer.closeAll('loading');
            }
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
    if(login_user != null&&login_user!=undefined){
        $httpProvider.defaults.headers.common = { 'key':login_user.loginKey,'id':login_user.id,'user_type':1};
    }

    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.interceptors.push('ResponseInterceptor');


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

    $stateProvider.state('/index', {
        url: '/index',
        templateUrl:'./view/index.html',
        controller:'indexController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'personApp',
                        files:['./controller/indexController.js']}
                    )
                }]
        }
    }).state('/mycard', {
        url: '/mycard',
        templateUrl:'./view/cardList.html',
        controller:'cardListController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'personApp',
                        files:['./controller/cardListController.js']}
                    )
                }]
        }
    }).state('/card_detail', {
        url: '/card_detail',
        templateUrl:'./view/card_detail.html',
        controller:'cardDetailController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'personApp',
                        files:['./controller/cardDetailController.js','/c/js/qrcode.min.js','/c/js/JsBarcode.all.min.js']}
                    )
                }]
        }
    }).state('/person_info', {
        url: '/person_info',
        templateUrl:'./view/person_info.html',
        controller:'personInfoController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'personApp',
                        files:['./controller/personInfoController.js']}
                    )
                }]
        }
    }).state('/recharge_list', {
        url: '/recharge_list',
        templateUrl:'./view/recharge_list.html',
        controller:'rechargeController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'personApp',
                        files:['./controller/rechargeController.js']}
                    )
                }]
        }
    }).state('/charge', {
        url: '/charge',
        templateUrl:'./view/charge.html',
        controller:'chargeController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'personApp',
                        files:['./controller/chargeController.js']}
                    )
                }]
        }
    }).state('/consume_list', {
        url: '/consume_list',
        templateUrl:'./view/consume_list.html',
        controller:'consumeController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'personApp',
                        files:['./controller/consumeController.js']}
                    )
                }]
        }
    }).state('/copuons_list', {
        url: '/copuons_list',
        templateUrl:'./view/couponsList.html',
        controller:'couponsListController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'personApp',
                        files:['./controller/couponsListController.js']}
                    )
                }]
        }
    });

    $urlRouterProvider.otherwise('/index');


}]);
