$(function() {
	$(".l_menu_show li").mouseover(function(){//鼠标经过左边类目出现右边类目
		$(".right_menu").show();
		$(".l_menu_show li").css("background","#ffb01a");
		$(this).css("background","#fcbe47");
	});
	$(".left_menu .right_menu").mouseout(function(){
		$(".right_menu").hide();
		$(".l_menu_show li").css("background","#ffb01a");
	})
});
