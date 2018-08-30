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




