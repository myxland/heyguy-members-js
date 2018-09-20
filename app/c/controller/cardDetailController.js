/**
 * Created by jacktong on 2018/9/6.
 */
'use strict';

var app = angular.module("personApp");

app.controller('cardDetailController',['$scope','$http','$location','$window','$rootScope',function ($scope,$http,$location,$rootScope){
    $scope.card = JSON.parse(localStorage.getItem('card_info'));

    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width : 150,
        height : 150
    });

    qrcode.makeCode($scope.card.cardNo);

    var barcode = document.getElementById('barcode'),
        str = $scope.card.cardNo,
        options = {
            format: "CODE128",
            displayValue: true,
            fontSize: 18,
            height: 80
        };
    JsBarcode(barcode, str, options);

    /**
     * 充值
     */
    $scope.recharge = function(){
        $location.path('charge');
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

    /**
     * 点击我的会员卡
     */
    $scope.getCard = function(){
        $location.path('mycard');
    }


}]);