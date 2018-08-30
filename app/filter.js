/**
 * Created by jacktong on 2017/8/4.
 */

angular.module("adminApp").filter('user_status',function(){
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
angular.module("shopApp").filter('user_status_shop',function(){
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





