$(function(){
	 $('#iframe_right').width($('#iframe_right').parent().width()-$('#main_menu').width());
	$('#iframe_right').height($('#iframe_right').parent().height());
	$('#iframe_right')[0].src='portal_1.html';
	$("#main_menu_tree").tree({
		url: 'json/tree_data1.json',
		method:'get',
		animate:true,
		onClick: function(node){
			//$(this).tree('beginEdit',node.target);
			if(node.text == "饼状图"){//左键图形事件
				$('#iframe_right')[0].src='charts/pie_chart.html';
				
			} else if(node.text == "折线图"){//左键报表事件
				$('#iframe_right')[0].src='charts/line_chart.html';
				
			} else if(node.text == "柱状图"){//左键报表事件
				$('#iframe_right')[0].src='charts/bar_chart.html';
				
			} else if(node.text == "面积图"){//左键报表事件
				$('#iframe_right')[0].src='charts/area_chart.html';
				
			} else if(node.text == "散点图"){//左键报表事件
				$('#iframe_right')[0].src='charts/scatter_chart.html';
				
			} else if(node.text == "漏斗图"){//左键报表事件
				$('#iframe_right')[0].src='charts/funnel_chart.html';
				
			} else if(node.text == "雷达图"){//左键报表事件
				$('#iframe_right')[0].src='charts/radar_chart.html';
				
			} else if(node.text == "多轴图"){//左键报表事件
				$('#iframe_right')[0].src='charts/multiline_chart.html';
				
			} else if(node.text == "报表1"){
				$('#iframe_right')[0].src='portal_1.html';
				
			} else if(node.text == "报表2"){
				$('#iframe_right')[0].src='portal_2.html';
				
			} else if(node.text == "报表3"){
				$('#iframe_right')[0].src='portal_3.html';
				
			}
		},
		onContextMenu: function(e,node){
            e.preventDefault();
            $('#main_menu_tree').tree('select',node.target);
            var get_node = $('#main_menu_tree').tree('getSelected');
            if (get_node.node_type=='00'){
                $('#create_menu').menu('show',{left: e.pageX,top: e.pageY});
            } else if (get_node.node_type=='01'){    
                    $('#update_menu').menu('show',{left: e.pageX,top: e.pageY});
            }
            else if (get_node.node_type=='02'){    
                $('#update_menu1').menu('show',{left: e.pageX,top: e.pageY});
            }else {
                   alert('其他类型');
            }
        },
	});
})
//目录功能
   //可编辑名称
   //增加目录//增加子节点//删除空目录

//增加目录功能节点 目录功能是由菜单提供的，类型有node_type指定。

//增加目录节点
	function append_menu(){
		var t = $('#main_menu_tree');
		var node = t.tree('getSelected');
		t.tree('append', {
			parent: (node?node.target:null),
			data: [{text: '新建文件夹',node_type:'00'}]
		});
	}

//增加子节点
	function append1(){//增加饼图
		var t = $('#main_menu_tree');
		var node = t.tree('getSelected');
		console.log(node.target,"target");
		var p_id=node.id;
		var new_text="饼状图";
		var new_node_type="01";
		t.tree('append', {
			parent: (node?node.target:null),
			data: [{par_id:p_id,text: new_text,node_type:new_node_type}]
		});
		$('#iframe_right')[0].src='pie.html';
	}

	function append2(){//折线图
		var t = $('#main_menu_tree');
		var node = t.tree('getSelected');
		t.tree('append', {
			parent: (node?node.target:null),
			data: [{text: '折线图',node_type:'01'}]
		});
		$('#iframe_right')[0].src='line.html';
	}

	function append3(){//柱状图
		var t = $('#main_menu_tree');
		var node = t.tree('getSelected');
		t.tree('append', {
			parent: (node?node.target:null),
			data: [{text: '柱状图',node_type:'01'}]
		});
		$('#iframe_right')[0].src='bar.html';
	}
	
	function append4(){//面积图
		var t = $('#main_menu_tree');
		var node = t.tree('getSelected');
		t.tree('append', {
			parent: (node?node.target:null),
			data: [{text: '面积图',node_type:'01'}]
		});
		$('#iframe_right')[0].src='area.html';
	}
	
	function append5(){//散点图
		var t = $('#main_menu_tree');
		var node = t.tree('getSelected');
		t.tree('append', {
			parent: (node?node.target:null),
			data: [{text: '散点图',node_type:'01'}]
		});
		$('#iframe_right')[0].src='scatter.html';
	}
	
	function append6(){//漏斗图
		var t = $('#main_menu_tree');
		var node = t.tree('getSelected');
		t.tree('append', {
			parent: (node?node.target:null),
			data: [{text: '漏斗图',node_type:'01'}]
		});
		$('#iframe_right')[0].src='area.html';
	}
	
	function append7(){//雷达图
		var t = $('#main_menu_tree');
		var node = t.tree('getSelected');
		t.tree('append', {
			parent: (node?node.target:null),
			data: [{text: '雷达图',node_type:'01'}]
		});
		$('#iframe_right')[0].src='radar.html';
	}
	
	function append8(){//多轴图
		var t = $('#main_menu_tree');
		var node = t.tree('getSelected');
		t.tree('append', {
			parent: (node?node.target:null),
			data: [{text: '多轴图',node_type:'01'}]
		});
		$('#iframe_right')[0].src='multiline.html';
	}
	
	function append9(){//报表
		var t = $('#main_menu_tree');
		var node = t.tree('getSelected');
		t.tree('append', {
			parent: (node?node.target:null),
			data: [{text: '新报表',node_type:'02'}]
		});
		//$('#iframe_right')[0].src='multiline.html';
	}

	//删除空目录
	function remove_nullcatalog(){

	    var childrenNodes = $('#main_menu_tree').tree('getChildren',node.target);
	    //alert(node.text+" "+node.node_type);
		if (childrenNodes=="")
			{
       			$('#main_menu_tree').tree('remove', node.target);
			}
		else{
			alert('该目录不为空，为避免误删，请先删除内容');
			 /*var msg = "该目录不为空，您真的确定要删除吗？"; 
			  if (confirm(msg)==true){ 
				  $('#tt').tree('remove', node.target); 
			  }else{ 
			  }*/ 
		}
	}
	//子节点功能
	    //编辑子节点   //删除子节点
	function removeit(){
		var node = $('#main_menu_tree').tree('getSelected');
		var msg = "确定要删除吗？"; 
		  if (confirm(msg)==true){ 
			  $('#iframe_right')[0].src='portal_1.html';
			  $('#main_menu_tree').tree('remove', node.target); 
		  }else{ 
		  }
		//$('#tt').tree('remove', node.target);
	}
	
	//编辑图表
	function updateitem(){
		var node = $('#main_menu_tree').tree('getSelected');
		if(node.text == "饼状图"){//左键图形事件
			$('#iframe_right')[0].src='charts_edit/pie_edit.html';
			
		} else if(node.text == "折线图"){//左键报表事件
			$('#iframe_right')[0].src='charts_edit/line_edit.html';
			
		} else if(node.text == "柱状图"){//左键报表事件
			$('#iframe_right')[0].src='charts_edit/bar_edit.html';
			
		} else if(node.text == "面积图"){//左键报表事件
			$('#iframe_right')[0].src='charts_edit/area_edit.html';
			
		} else if(node.text == "散点图"){//左键报表事件
			$('#iframe_right')[0].src='charts_edit/scatter_edit.html';
			
		} else if(node.text == "漏斗图"){//左键报表事件
			$('#iframe_right')[0].src='charts_edit/funnel_edit.html';
			
		} else if(node.text == "雷达图"){//左键报表事件
			$('#iframe_right')[0].src='charts_edit/radar_edit.html';
			
		} else if(node.text == "多轴图"){//左键报表事件
			$('#iframe_right')[0].src='charts_edit/multiline_edit.html';
			
		}
	}
	//爆表的编辑
	function updateitem1(){
		var node = $('#main_menu_tree').tree('getSelected');
		if(node.text == "报表1"){
			$('#iframe_right')[0].src='portal_edit_1.html';
			
		} else if(node.text == "报表2"){
			$('#iframe_right')[0].src='portal_edit_2.html';
			
		} else if(node.text == "报表3"){
			$('#iframe_right')[0].src='portal_edit_3.html';
			
		}
	}
	
	function renameitem(){
		var node = $('#main_menu_tree').tree('getSelected');
		$('#main_menu_tree').tree('beginEdit',node.target);
	}
