//打开字滑入效果
window.onload = function() {
	$(".connect p").eq(0).animate({
		"left" : "0%"
	}, 600);
	$(".connect p").eq(1).animate({
		"left" : "0%"
	}, 400);
};
// jquery.validate表单验证
/*$(document).ready(function() {
	// 登陆表单验证
	$("#loginForm").validate({
		rules : {
			userName : {
				required : true,// 必填
				minlength : 3, // 最少6个字符
				maxlength : 32,// 最多20个字符
			},
			password : {
				required : true,
				minlength : 3,
				maxlength : 32,
			},
		},
		// 错误信息提示
		messages : {
			userName : {
				required : "必须填写用户名",
				minlength : "用户名至少为3个字符",
				maxlength : "用户名至多为32个字符",
				remote : "用户名已存在",
			},
			password : {
				required : "必须填写密码",
				minlength : "密码至少为3个字符",
				maxlength : "密码至多为32个字符",
			},
		},

	});
});*/

//弹出窗口封装方法
function stopPropagation(e) {
	var ev = e || window.event;
	if (ev.stopPropagation) {ev.stopPropagation();}
	else if (window.event) {window.event.cancelBubble = true;}//兼容IE
}
function popPanel(panel,e){
	$(panel).parent().siblings().find(".panel_div").slideUp();
	$(panel).slideToggle();
	stopPropagation(e);
	$(panel).click(function (e) {stopPropagation(e);});
	$(document).bind('click', function () {$(panel).slideUp();});
}

//下拉菜单方法
function menu_dropDown(name){
	$(name).click(function(){
		var ul=$(this).parent().find("ul");
		ul.slideToggle();
		$(this).find('.ico_arrows').toggleClass("ico_arrows_down");
	})
}




