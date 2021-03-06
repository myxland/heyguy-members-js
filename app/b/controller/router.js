/**
 * Created by jacktong on 2018/8/19.
 */

'use strict';

var admin_user = JSON.parse(localStorage.getItem("shopUser"));
var discountBean = JSON.parse(localStorage.getItem("discountBean"));
var userBean = JSON.parse(localStorage.getItem("userBean"));

var app = angular.module('shopApp',['ui.router','oc.lazyLoad','ui.bootstrap']);

app.factory('ResponseInterceptor', ['$q','$window', ResponseInterceptor]);

app.service("curr_data", [function(){
    this.admin_user=null;
    this.discountBean=null;
    this.userBean=null;
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
                layer.alert('请登录');
                $window.location.href="/b";
            } else if(response.data=='1004'){
                layer.alert('超时，请登录');
                $window.location.href="/b";
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
    if(admin_user != null&&admin_user!=undefined){
        $httpProvider.defaults.headers.common = { 'key':admin_user.loginKey,'id':admin_user.id,'user_type':2};
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

    $stateProvider.state('/main', { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/main',
        templateUrl:'./view/main.html',
        controller:'mainController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'shopApp',
                        files:['./controller/mainController.js']}
                    )
                }]
        }
    }).state('/discount', { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/discount',
        templateUrl:'./view/discount.html',
        controller:'discountController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'shopApp',
                        files:['./controller/discountController.js']}
                    )
                }]
        }
    }).state('/addDiscount', { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/addDiscount',
        templateUrl:'./view/addDiscount.html',
        controller:'addDiscountController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'shopApp',
                        files:['./controller/addDiscountController.js']}
                    )
                }]
        }
    }).state('/updateDiscount', { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/updateDiscount',
        templateUrl:'./view/updateDiscount.html',
        controller:'updateDiscountController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'shopApp',
                        files:['./controller/updateDiscountController.js']}
                    )
                }]
        }
    }).state('/recharge', { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/recharge',
        templateUrl:'./view/recharge.html',
        controller:'rechargeController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'shopApp',
                        files:['./controller/rechargeController.js']}
                    )
                }]
        }
    }).state('/addRecharge', { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/addRecharge',
        templateUrl:'./view/addRecharge.html',
        controller:'addRechargeController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'shopApp',
                        files:['./controller/addRechargeController.js']}
                    )
                }]
        }
    }).state('/consume', { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/consume',
        templateUrl:'./view/consume.html',
        controller:'consumeController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'shopApp',
                        files:['./controller/consumeController.js']}
                    )
                }]
        }
    }).state('/addConsume', { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/addConsume',
        templateUrl:'./view/addConsume.html',
        controller:'addConsumeController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'shopApp',
                        files:['./controller/addConsumeController.js']}
                    )
                }]
        }
    }).state('/user', { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/user',
        templateUrl:'./view/user.html',
        controller:'userController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'shopApp',
                        files:['./controller/userController.js']}
                    )
                }]
        }
    }).state('/addUser', { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/addUser',
        templateUrl:'./view/addUser.html',
        controller:'addUserController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'shopApp',
                        files:['./controller/addUserController.js']}
                    )
                }]
        }
    }).state('/updateUser', { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/updateUser',
        templateUrl:'./view/updateUser.html',
        controller:'updateUserController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'shopApp',
                        files:['./controller/updateUserController.js']}
                    )
                }]
        }
    }).state('/giftCard', { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/giftCard',
        templateUrl:'./view/giftCard.html',
        controller:'giftCardController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'shopApp',
                        files:['./controller/giftCardController.js']}
                    )
                }]
        }
    }).state('/addGiftCard', { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/addGiftCard',
        templateUrl:'./view/addGiftCard.html',
        controller:'addGiftCardController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'shopApp',
                        files:['./controller/addGiftCardController.js']}
                    )
                }]
        }
    }).state('/giftCardConvert', { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/giftCardConvert',
        templateUrl:'./view/giftCardConvert.html',
        controller:'giftCardConvertController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'shopApp',
                        files:['./controller/giftCardConvertController.js']}
                    )
                }]
        }
    }).state('/addGiftCardConvert', { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/addGiftCardConvert',
        templateUrl:'./view/addGiftCardConvert.html',
        controller:'addGiftCardConvertController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'shopApp',
                        files:['./controller/addGiftCardConvertController.js']}
                    )
                }]
        }
    }).state('/couponsConfig', { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/couponsConfig',
        templateUrl:'./view/addCouponsConfig.html',
        controller:'addCouponConfigController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'shopApp',
                        files:['./controller/addCouponConfigController.js']}
                    )
                }]
        }
    }).state('/manjianConfig', { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/manjianConfig',
        templateUrl:'./view/addManjian.html',
        controller:'addManjianController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'shopApp',
                        files:['./controller/addManjianController.js']}
                    )
                }]
        }
    }).state('/realDiscountConfig', { //导航用的名字，如<a ui-sref="login">login</a>里的login
        url: '/realDiscountConfig',
        templateUrl:'./view/addRealDiscount.html',
        controller:'addRealDiscountController',
        resolve: {
            deps: ['$ocLazyLoad',
                function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'shopApp',
                        files:['./controller/addRealDiscountController.js']}
                    )
                }]
        }
    });

    $urlRouterProvider.otherwise('/main');

}]);
