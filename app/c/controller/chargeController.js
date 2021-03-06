/**
 * Created by jacktong on 2018/9/13.
 */
var app = angular.module("personApp");

app.controller('chargeController',['$scope','$http','$location','$window',function ($scope,$http,$location,$window){

    $scope.card = JSON.parse(localStorage.getItem('card_info'));

    var sc;
    var nonceStr;
    var package_str;
    var appid;
    var sign;
    var order_no;

    /**
     * 充值
     */
    $scope.doCharge = function(){
        var money = $scope.money;
        if(money==undefined||''==money){
            layer.msg('请输入充值金额');
            return;
        }
        var openid = localStorage.getItem('openid');
        $http({
            method:"POST",
            url:base_url+"/2c/wechat/goPaymen",
            data:{
                card_no:$scope.card.cardNo,
                money:money,
                openid:openid
            },
            cache:false,
        }).success(function (data,status) {
            if(data.code=='0'){
                nonceStr = data.data.noncestr;
                package_str = "prepay_id="+data.data.prepay_id; //需要生成订单后获取
                appid = data.data.appid;
                sc = data.data.ts;
                sign = data.data.sign;
                order_no = data.data.order_no;
                if (typeof WeixinJSBridge == "undefined"){
                    if( document.addEventListener ){
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    }else if (document.attachEvent){
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                }else{
                    onBridgeReady();
                }

            }else{
                layer.msg('提示',data.MESSAGE);
            }
        })
            .error(function (response,status,header) {
                layer.msg('提示','数据加载异常'+response);
            });
    }

    /**
     * 微信支付
     */
    function onBridgeReady(){
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId":appid,     //公众号名称，由商户传入
                "timeStamp":sc,         //时间戳，自1970年以来的秒数
                "nonceStr":nonceStr, //随机串
                "package":package_str,
                "signType":"MD5",         //微信签名方式：
                "paySign":sign //微信签名
            },
            function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ){
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                    //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    layer.msg("支付成功");
                    //跳转订单详细页面
                    $window.location.href = "/c/frame#/index"
                }else{
                    layer.msg(res.err_msg);
                }
            });
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
