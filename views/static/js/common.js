define(["jquery", "template", "cookie"], function($, template){
	$(function(){
		//判断当前页是不是在登录页面，如果是就不做如下的操作
		if("/dashboard/login" != location.pathname){
			
			 //完善登录功能，当用户处于未登录状态时，跳转到登录页面
		
			if(!$.cookie("PHPSESSID")) {
				location.href = "/dashboard/login";
			}else {
				//从cookie中获取登录成功后存储的用户信息
		        var userInfo = JSON.parse($.cookie("userinfo"))
		        var html = template("profile-tpl", userInfo);
	
		        //将模板渲染到页面中刚才挖坑的地方
		        $("#userinfo").html(html);

			}
			
		}  
		
		
		//退出登录的功能
		$("#logout").click(function() {
			$.ajax({
				type: "post",
				url: "/api/logout",
				success: function(data) {
					if(data.code == 200) {
						location.href = "/dashboard/login";
					}
				}
			})
		});
		
		//二级菜单显示功能
		$(".navs>ul>li>ul").parent().click(function () {
			$(this).children("ul").slideToggle();
			
		});
		
		$(".navs>ul>li").click(function () {
			$(this).children("a").addClass("active");
			$(this).siblings().children("a").removeClass("active");
		})
		
		$(".navs a").each(function(i, v) {
			$(v).removeClass("active");
			if($(v).attr("href") == location.pathname) {
				$(v).addClass("active");
			}
		})
		
		
		
		
    })
})