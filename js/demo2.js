$(function() {
	window.mu = new nono.MutationJs(document.getElementById("edit_box"));//获取监听对象 
    mu.disconnect();//取消监听 
    mu.reObserve();//重新监听
    $("#undo").on('click',function(){//点击撤回给取消撤回加事件
    	$("#redo").attr("onclick","mu.redo()");
    });
    
	var dragresize = new DragResize('dragresize', {maxLeft: 1200, maxTop: 800});
	dragresize.isElement = function(elm) {
		if(elm.className && elm.className.indexOf('drsElement') > -1) return true;
	};
	dragresize.isHandle = function(elm) {
		if(elm.className && elm.className.indexOf('drsMoveHandle') > -1) return true;
	};
	dragresize.apply(document);
	
	$(document).bind("click",function(){
	    $('.fontColor').hide();
	    $('.bgColor').hide();
	})
	$(".edit_box").on('click',function(){
		$('.fontSize').hide();$('.textMarquee').hide();$('.playTime').hide();
	});
	
	$(".fontColor span").bind("click",function(){//修改文字颜色
		var box =$("#boxId").val();
		var color = $(this).css("background-color");
		if(box){
			if($("#"+box).attr("class").indexOf("textBox")>=0){
				$("#"+box).css("color",color);
			}
		}else{
			alert("请选择要操作的对象!!!");
		}
	});
	$(".bgColor span").bind("click",function(){//修改背景颜色
		var box =$("#boxId").val();
		var color = $(this).css("background-color");
		if(box){
			if($("#"+box).attr("class").indexOf("textBox")>=0){
				$("#"+box).css("background-color",color);
			}
		}else{
			alert("请选择要操作的对象!!!");
		}
	});
	
	var dataShow =[];
	/*dataShow = [
		{"controlType":"imgBox","width":449,"height":221,"left":0,"top":0,"color":"black","backgroundColor":"white","boxId":"imgBox0","path":"rtmp://192.168.0.33","time":60},
		{"controlType":"imgBox","width":451,"height":210,"left":749,"top":0,"color":"black","backgroundColor":"white","boxId":"imgBox1","path":"rtmp://192.168.0.33","time":60},
		{"controlType":"imgBox","width":447,"height":278,"left":0,"top":522,"color":"black","backgroundColor":"white","boxId":"imgBox2","path":"rtmp://192.168.0.33","time":60},
		{"controlType":"imgBox","width":452,"height":279,"left":748,"top":521,"color":"black","backgroundColor":"white","boxId":"imgBox3","path":"rtmp://192.168.0.33","time":60},
		{"controlType":"videoBox","width":302,"height":302,"left":448,"top":219,"color":"black","backgroundColor":"white","boxId":"videoBox2","path":"rtmp://192.168.0.33","time":60}
	];*/
	console.info(dataShow);
	if(dataShow.length>0){
		$.each(dataShow,function(i){
			var imgBox='<div class="'+ dataShow[i].controlType +' drsElement drsMoveHandle" style="width:'+ dataShow[i].width +'px;height:'+ dataShow[i].height +'px;top:'+ dataShow[i].top +'px;left:'+ dataShow[i].left +'px;" id="'+ dataShow[i].boxId +'"></div>';
			$(".edit_box").append(imgBox);
		})
	}	
	
	$(".drsElement").on('mousedown',function(){
		$("#boxId").val($(this).attr("id"));
		//$(this).css("border-color","#009688").siblings().css("border-color","#f00");
	});
	
//
//dragresize.ondragfocus = function() { };
//dragresize.ondragstart = function(isResize) {};
//dragresize.ondragmove = function(isResize) { };
//dragresize.ondragend = function(isResize) {//移动结束};
//dragresize.ondragblur = function() { };
	var dataMenu = [
		[
			{
				text: "插入文字",
				func: function() {
					addText();
				}
			},
			{
				text: "插入图片",
				func: function() {
					addImg();
				}
			},
			{
				text: "插入音乐",
				func: function() {
					addSong();
				}
			},
			{
				text: "插入视频",
				func: function() {
					addVideo();
				}
			},
			{
				text: "移除",
				func: function() {
					var hideBoxId = $("#boxId").val();
					if(document.getElementById(hideBoxId)){//判断div是否存在
						document.getElementById(hideBoxId).remove();//
					}
					
				}
			}
		]
	];
	$(".edit_box").smartMenu(dataMenu);
	
		
});

function save(){//保存
	var dataShow='';
	$(".drsElement").each(function(i){
		if($(this)[0].className.indexOf("imgBox")>=0){
			var controlType = "imgBox";
		}else if($(this)[0].className.indexOf("videoBox")>=0){
			var controlType = "videoBox";
		}else if($(this)[0].className.indexOf("textBox")>=0){
			var controlType = "textBox";
		}else if($(this)[0].className.indexOf("songBox")>=0){
			var controlType = "songBox";
		}
		dataShow += '{"controlType":"'+ controlType +'","width":'+ $(this)[0].offsetWidth +',"height":'+ $(this)[0].offsetHeight +',"left":'+ $(this)[0].offsetLeft +',"top":'+ $(this)[0].offsetTop +',"color":"'+ $(this).css("color") +'","backgroundColor":"'+ $(this).css("background-color") +'","boxId":"'+ $(this)[0].id +'","path":"rtmp://192.168.0.33","time":60}'
		var len = $(".drsElement").length-1;
		if(len>i){
			dataShow +=',';
		}
	});
	//dataShow = eval("" + dataShow + "");
	console.info(dataShow);
	
}

function addText(){//添加文字
	var num=$(".drsElement").length;
	var imgBox='<div class="textBox drsElement drsMoveHandle" style="top:200px;left:200px" id="textBox'+num+'" data-text="这是一段滚动文字"><p>这是一段滚动文字</p></div>';
	$(".edit_box").append(imgBox);
	$(".textBox").on('mousedown',function(){
		$("#boxId").val($(this).attr("id"));
	});
}

function addImg(){//添加图片
	var num=$(".drsElement").length;
	var imgBox='<div class="imgBox drsElement drsMoveHandle" style="top:200px;left:200px" id="imgBox'+num+'"></div>';
	$(".edit_box").append(imgBox);
	$(".imgBox").on('mousedown',function(){
		$("#boxId").val($(this).attr("id"));//记录Id
	})
}

function addVideo(){//添加视频
	var num=$(".drsElement").length;
	var imgBox='<div class="videoBox drsElement drsMoveHandle" style="top:200px;left:200px" id="videoBox'+num+'"></div>';
	$(".edit_box").append(imgBox);
	$(".videoBox").on('mousedown',function(){
		$("#boxId").val($(this).attr("id"));
	})
}

function addSong(){//添加音乐
	var num=$(".drsElement").length;
	var imgBox='<div class="songBox drsElement drsMoveHandle" style="top:200px;left:200px" id="songBox'+num+'"></div>';
	$(".edit_box").append(imgBox);
	$(".songBox").on('mousedown',function(){
		$("#boxId").val($(this).attr("id"));
	})
}

function moverLeft(){//向左移
	var box =$("#boxId").val();
	if(box){
		$("#"+box).css({"height":"100%","left":"0px","top":"0px"});
	}else{
		alert("请选择要操作的对象!!!");
	}
}

function moverUp(){//向上移
	var box =$("#boxId").val();
	if(box){
		$("#"+box).css({"width":"100%","left":"0px","top":"0px"});
	}else{
		alert("请选择要操作的对象!!!");
	}
}

function moverRight(){//向右移
	var box =$("#boxId").val();
	if(box){
		var left = parseInt($(".edit_box").width())-parseInt($("#"+box).width()+2);
		$("#"+box).css({"height":"100%","left":left+"px","top":"0px"});
	}else{
		alert("请选择要操作的对象!!!");
	}
}

function moverDown(){//向下移
	var box =$("#boxId").val();
	if(box){
		var top = parseInt($(".edit_box").height())-parseInt($("#"+box).height()+2);
		$("#"+box).css({"width":"100%","left":"0px","top":top+"px"});
	}else{
		alert("请选择要操作的对象!!!");
	}
}

function moverFull(){//全屏
	var box =$("#boxId").val();
	if(box){
		$("#"+box).css({"width":"100%","height":"100%","left":"0px","top":"0px"});
	}
}

function removeAll(){//清除所有
	$(".edit_box div").remove();
}

function changeFontColor(){//选择字体颜色
	event.stopImmediatePropagation();//取消事件冒泡；
	$(".bgColor").hide();
	$(".fontSize").hide();
	$(".textMarquee").hide();
	$(".playTime").hide();
	$(".fontColor").toggle();
}

function changeBgColor(){//选择背景颜色
	event.stopImmediatePropagation();//取消事件冒泡；
	$(".fontColor").hide();
	$(".fontSize").hide();
	$(".textMarquee").hide();
	$(".playTime").hide();
	$(".bgColor").toggle();
}


function changeAlign(align){//修改对齐方式
	var box =$("#boxId").val();
	$("#"+box+" p").css("text-align",align);
	
}

function changeMarquee(){//选择循环属性
	event.stopImmediatePropagation();//取消事件冒泡；
	$(".fontColor").hide();
	$(".bgColor").hide();
	$(".fontSize").hide();
	$(".playTime").hide();
	$(".textMarquee").toggle();
}

function changeFontSize(){//选择字体大小
	event.stopImmediatePropagation();//取消事件冒泡；
	$(".fontColor").hide();
	$(".bgColor").hide();
	$(".textMarquee").hide();
	$(".playTime").hide();
	$(".fontSize").toggle();
}

function changePlayTime(){//选择播放时长
	event.stopImmediatePropagation();//取消事件冒泡；
	$(".fontColor").hide();
	$(".bgColor").hide();
	$(".textMarquee").hide();
	$(".fontSize").hide();
	$(".playTime").toggle();
}

function textMarquee(tag){//给文字添加滚动效果
	if(tag==1){
		var box =$("#boxId").val();
		var html = $("#"+box).data("text");
		if($("select[name=marTag]").val()==1){
			html = '<marquee direction="'+ $("select[name=marDirection]").val() +'" behavior="'+ $("select[name=marBehavior]").val() +'" scrollamount="'+ $("select[name=marScrollamount]").val() +'">'+ html +'</marquee>';
			$("#"+box+" p").html(html);
			$(".textMarquee").hide();
		}else{
			$("#"+box+" p").html(html);
		}
	}
	$(".textMarquee").hide();
}

function fontSize(tag){//设置字体大小
	if(tag==1){
		var box =$("#boxId").val();
		var size = $("input[name=fontSize]").val();
		$("#"+box).css("font-size",size+'px');
	}
	$(".fontSize").hide();

}

function playTime(tag){//设置播放时长
	if(tag==1){
		var box =$("#boxId").val();
		var size = $("input[name=playTime]").val();
		$("#"+box).attr("data-time",size);
	}
	$(".playTime").hide();

}

