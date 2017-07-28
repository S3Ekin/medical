$(function() {
	//初始化加载树
	$.ajax({
		url : __contextpath+"/main/initOrgTree.do",
		dataType:"json",
		success:function(data){
			$('#org_tree').tree('loadData',data);
		}
	});
	//右键显示菜单
	$('#org_tree').tree({
		onContextMenu: function(e,node){
            e.preventDefault();
            $(this).tree('select',node.target);
            var get_node = $('#org_tree').tree('getSelected');
            $('#org_menu').menu('show',{left: e.pageX,top: e.pageY});
        }
	});
	//更改节点的名字
	$('#org_tree').tree({
		onAfterEdit: function (node){
			$.ajax({
				url : __contextpath+"/main/changeOrgTree.do?node_id="+node.id+"&name="+node.text,
				dataType:"json",
				success :function(data) {
					$('#org_tree').tree('loadData',data);
				},
				error : function(){
					alert("错误");
				}
			});
		}
	});
	
})

//修改节点的名字
//node.id  par.id node.type param1都不变，只改变name
function changename(){
	var t = $('#org_tree');
	var node = t.tree('getSelected');
	$('#org_tree').tree('beginEdit',node.target);
}



//弹出增加节点的对话框
function orgdlg_display(){
		$('#org_dlg').dialog({
			closed:false
		});
}
//添加节点
function append_orgnode(){
	var node_name=document.getElementById("set_orgname").value;
	if((node_name!='')&&(node_name.length<256)){
		var t = $('#org_tree');
		var node = t.tree('getSelected');
		var new_text=node_name;
		t.tree('append', {
			parent: (node?node.target:null),
			data: [{text: new_text}]
		});
		//par_id:p_id tree里没有par_id这个属性，所以前台不用加进去，只用写如数据库即可。缓存里也是要的。
		var p_id=node.id;//父节点
		$.ajax({
			url : __contextpath+"/main/addOrgTree.do?par_id="+p_id+"&name="+new_text,
			dataType:"json",
			success :function(data) {
				$('#org_tree').tree('loadData',data);
			},
			error : function(){
				alert("错误");
			}
		});
		//执行完添加节点之后再把对话框给隐藏起来
		$('#org_dlg').dialog({
			closed:true
		})
	}
	else{
		alert('error');
	}
}
//取消显示对话框
function cancel_orgdlg(){
	$('#org_dlg').dialog({
		closed:true
	})
}



//删除节点，非空勿删
function remove_org(){
	var node = $('#org_tree').tree('getSelected');
    var childrenNodes = $('#org_tree').tree('getChildren',node.target);
	if (childrenNodes=="")
		{
   			$('#org_tree').tree('remove', node.target);
   			var n_id = node.id;
   			$.ajax({
   				url : __contextpath+"/main/removeOrgTree.do?node_id="+n_id,
   				dataType:"json",
   				success :function(data) {
   					$('#org_tree').tree('loadData',data);
   				},
   				error : function(){
   					alert("错误");
   				}
   			});
   			
		}
	else{
		$.messager.alert('提示','该机构还有子机构，请先删除子机构');
	}
}
	
	