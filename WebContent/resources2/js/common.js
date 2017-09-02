/**
 * Created by demo on 2017/5/10.
 */


//common代码

/************楼层平滑滚动代码*****************/
// 转换为数字
function intval(v)
{
    v = parseInt(v);
    return isNaN(v) ? 0 : v;
}
// 获取元素信息
function getPos(e)
{
    var l = 0;
    var t  = 0;
    var w = intval(e.style.width);
    //var w = intval($("#"+e).width());
    
    var h = intval(e.style.height);
    var wb = e.offsetWidth;
    var hb = e.offsetHeight;
    while (e.offsetParent){
        l += e.offsetLeft + (e.currentStyle?intval(e.currentStyle.borderLeftWidth):0);
        t += e.offsetTop  + (e.currentStyle?intval(e.currentStyle.borderTopWidth):0);
        e = e.offsetParent;
    }
    l += e.offsetLeft + (e.currentStyle?intval(e.currentStyle.borderLeftWidth):0);
    t  += e.offsetTop  + (e.currentStyle?intval(e.currentStyle.borderTopWidth):0);
    return {x:l, y:t, w:w, h:h, wb:wb, hb:hb};
}
//  获取滚动条信息
function getScroll()
{
    var t, l, w, h;
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
    }
    return { t: t, l: l, w: w, h: h };
}
// 锚点(Anchor)间平滑跳转
function scroller(el, duration)
{
    if(typeof el !='object') { el = document.getElementById(el); }
    if(!el) return;
    var z = this;
    z.el = el;
    z.p = getPos(el);
    z.s = getScroll();
    z.clear = function(){window.clearInterval(z.timer);z.timer=null};
    z.t=(new Date).getTime();
    z.step = function(){
        var t = (new Date).getTime();
        var p = (t-z.t) / duration;
        if (t >= duration + z.t) {
            z.clear();
            window.setTimeout(function(){z.scroll(z.p.y, z.p.x)},13);
        } else {
            st = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.y-z.s.t) + z.s.t;
            sl = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.x-z.s.l) + z.s.l;
            z.scroll(st, sl);
        }
    };
    z.scroll = function (t, l){var t1=t-45;window.scrollTo(l, t1);};
    z.timer = window.setInterval(function(){z.step();},13);
}



/*************树结构*****************/
var zTree;
var zTree_view={
    dblClickExpand: false,//双击节点时，是否自动展开父节点的标识
    showLine: true,//是否显示节点之间的连线
    fontCss: {'color': 'black', 'font-weight': '500'},//字体样式函数
    selectedMulti: false, //设置是否允许同时选中多个节点
    showIcon: false,  //设置不显示图标
    checkable: true
  };
var zTree_check={
    chkboxType: {"Y": "ps", "N": "ps"},
    chkStyle: "checkbox",//复选框类型
    enable: true //每个节点上是否显示 CheckBox
  };
var zTree_data={
    simpleData: {//简单数据模式
      enable: true,
      idKey: "id",
      pIdKey: "pId",
      rootPId: ""
    },
    key: {  
        title: "name"  //鼠标移入时显示的文字
    }  
  };

/*************index首页*****************/
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
	var if_body=$('iframe').contents().find('html');//获取内联框架的body
	if_body.unbind();
	if_body.bind('click', function () {$(panel).slideUp();})
}

//下拉菜单方法
function menu_dropDown(name){
	$(name).click(function(){
		var ul=$(this).parent().find("ul");
		ul.slideToggle();
		$(this).find('.ico_arrows').toggleClass("ico_arrows_down");
	})
}


/*********2017.05.17*************/
/************提示模态框代码*****************/
var AlertModal=	'<div class="modal fade" id="modal_alert" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">'+
					'<div class="modal-dialog" style="width:300px;margin:65px auto;" >'+
						'<div class="modal-content">'+
							'<div class="modal-header">'+		
								'<button type="button" class="close" data-dismiss="modal">'+
//									'<span class="is_true" aria-hidden="true" style="position:relative;top:-8px;">&times;</span><span class="sr-only">Close</span>'+
									'<span class="is_true" aria-hidden="true">&times;</span><span class="sr-only">Close</span>'+
								'</button>'+
							'</div>'+
							'<div class="modal-body">'+
								'<div style="height:65px;" id="TxtInsert">'+
									'<!-- <p>TEXT！</p> -->'+
								'</div>'+
							'</div>'+
							'<div class="modal-footer" style="text-align:center;">'+
								'<button type="button" class="btn btn-primary is_true" id="AjaxTrue" data-dismiss="modal">确定</button>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>';	
//$("#AlertModal").append(AlertModal);

 
//无遮罩层提示框
var ifra_AlertModal=	'<div class="modal fade" id="modal_alert" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="false">'+
							'<div class="modal-dialog" style="width:300px;margin:65px auto;" >'+
								'<div class="modal-content">'+
									'<div class="modal-header">'+		
										'<button type="button" class="close" data-dismiss="modal">'+
//											'<span class="is_true" aria-hidden="true" style="position:relative;top:-8px;">&times;</span><span class="sr-only">Close</span>'+
											'<span class="is_true" aria-hidden="true">&times;</span><span class="sr-only">Close</span>'+
										'</button>'+
									'</div>'+
									'<div class="modal-body">'+
										'<div style="height:65px;" id="TxtInsert">'+
											'<!-- <p>TEXT！</p> -->'+
										'</div>'+
									'</div>'+
									'<div class="modal-footer" style="text-align:center;">'+
										'<button type="button" class="btn btn-primary is_true" id="AjaxConfirm" data-dismiss="modal">确定</button>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'</div>';	

//删除确认框
var del_AlertModal=	'<div class="modal fade" id="modal_alertDel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">'+
							'<div class="modal-dialog" style="width:300px;margin:65px auto;" >'+
								'<div class="modal-content">'+
									'<div class="modal-header">'+		
										'<button type="button" class="close" data-dismiss="modal">'+
//											'<span class="is_true" aria-hidden="true" style="position:relative;top:-8px;">&times;</span><span class="sr-only">Close</span>'+
											'<span class="is_true" aria-hidden="true">&times;</span><span class="sr-only">Close</span>'+
										'</button>'+
									'</div>'+
									'<div class="modal-body">'+
										'<div style="height:65px;" id="TxtInsert">'+
											'<!-- <p>TEXT！</p> -->'+
										'</div>'+
									'</div>'+
									'<div class="modal-footer">'+
										'<button type="button" class="btn btn-primary" id="AjaxConfirm" data-dismiss="modal">确定</button>'+
										'<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'</div>';	



/*********2017.08.22*************/
/************封装代码*****************/
//共享onload事件
function addLoadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload;
			func();
		}
	}
}
//插入到指定元素前面的fn //parent.insertBefore(new,target);这是源js已有的封装
function insertBefore(newElement,targetElement){
  var parent=targetElement.parentNode;
  parent.insertBefore(newElement,targetElement);
}
//插入到指定元素后面的fn
function insertAfter(newElement,targetElement){
  var parent=targetElement.parentNode;
  if(parent.lastChild == targetElement){
    parent.appendChild(newElenment);
  }else{
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}
















