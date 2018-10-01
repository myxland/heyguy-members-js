/**
 * Created by jacktong on 2017/8/4.
 */

app.filter('user_status',function(){
    return function(status){
        var status_name = "";
        if(status=="1"){
            status_name = "正常";
        }
        if(status=="0"){
            status_name = "冻结";
        }
        return status_name;
    }
});
app.filter('user_status_shop',function(){
    return function(status){
        var status_name = "";
        if(status=="1"){
            status_name = "正常";
        }
        if(status=="0"){
            status_name = "冻结";
        }
        if(status=="-1"){
            status_name = "作废";
        }
        return status_name;
    }
});
app.filter('card_type',function(){
    return function(status){
        var status_name = "";
        if(status=="1"){
            status_name = "储值卡";
        }
        if(status=="2"){
            status_name = "折扣卡";
        }
        return status_name;
    }
});
app.filter('card_status',function(){
    return function(status){
        var status_name = "";
        if(status=="0"){
            status_name = "未使用";
        }
        if(status=="1"){
            status_name = "已使用";
        }
        return status_name;
    }
});

app.filter('coupon_type',function(){
    return function(type){
        var type_name = "";
        if(type=="0"){
            type_name = "长期有效";
        }
        if(type=="1"){
            type_name = "限时有效";
        }
        return type_name;
    }
});

app.filter('coupon_if_over',function(){
    return function(parm){
        var parm_value = "";
        if(parm=="0"){
            parm_value = "否";
        }
        if(parm=="1"){
            parm_value = "是";
        }
        return parm_value;
    }
});

app.filter('coupon_first_give',function(){
    return function(parm){
        var parm_value = "";
        if(parm=="0"){
            parm_value = "否";
        }
        if(parm=="1"){
            parm_value = "是";
        }
        return parm_value;
    }
});

app.filter('coupon_config_status',function(){
    return function(parm){
        var parm_value = "";
        if(parm=="0"){
            parm_value = "不生效";
        }
        if(parm=="1"){
            parm_value = "生效";
        }
        return parm_value;
    }
});

app.filter('coupons_use_status',function(){
    return function(parm){
        var parm_value = "";
        if(parm=="0"){
            parm_value = "未使用";
        }
        if(parm=="1"){
            parm_value = "已使用";
        }
        if(parm=="-1"){
            parm_value = "已过期";
        }
        return parm_value;
    }
});




