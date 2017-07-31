$(function(){
	var myChart = echarts.init($('#radar_div_chart').get(0));
	myChart.setOption(lineoption);
	////////////////////////////////js本地变量数据
	//时间频度数据
	var options_rate = [ {
		text : "年份",
		value : "year"
	}, {
		text : "月份",
		value : "month"
	}, {
		text : "日期",
		value : "day"
	} ];
	
	// 年数据
	var options_time_year = [ {
		text : "2015年",
		value : "2015"
	}, {
		text : "2016年",
		value : "2016"
	} ];

	// 月数据
	var options_time_month = [ {
		text : "2015年6月",
		value : "201506"
	}, {
		text : "2015年7月",
		value : "201507"
	}, {
		text : "2015年8月",
		value : "201508"
	}, {
		text : "2015年9月",
		value : "201509"
	}, {
		text : "2015年10月",
		value : "201510"
	}, {
		text : "2015年11月",
		value : "201511"
	}, {
		text : "2015年12月",
		value : "201512"
	}, {
		text : "2016年1月",
		value : "201601"
	}, {
		text : "2016年2月",
		value : "201602"
	}, {
		text : "2016年3月",
		value : "201603"
	}, {
		text : "2016年4月",
		value : "201604"
	}, {
		text : "2016年5月",
		value : "201605"
	}, {
		text : "2016年6月",
		value : "201606"
	}, {
		text : "2016年7月",
		value : "201607"
	}, {
		text : "2016年8月",
		value : "201608"
	}, {
		text : "2016年9月",
		value : "201609"
	}, {
		text : "2016年10月",
		value : "201610"
	} ];
	
	//数据展示类型
	var options_charttype = [ {
		text : "折线",
		value : "line"
	}, {
		text : "柱状",
		value : "bar"
	}, {
		text : "面积",
		value : "area"
	} ,
	{
		text : "雷达",
		value : "area"
	},
	{
		text : "散点",
		value : "area"
	},
	{
		text : "双轴",
		value : "area"
	},
	];
	
	var options_fre = [ {
		text : "时间",
		value : "time"
	}, {
		text : "部门",
		value : "brand"
	}];
	
	var area_combotree = ﻿[{"children":[{"id":101,"text":"院办公室","children":[]},{"id":102,"text":"信息科","children":[]},{"id":103,"text":"财务科","children":[{"id":108,"text":"挂号处","children":[]},{"id":109,"text":"收费处","children":[]},{"id":110,"text":"出入院结算","children":[]},{"id":111,"text":"社保结算处","children":[]}]},{"id":104,"text":"总务科","children":[{"id":112,"text":"餐厅","children":[]},{"id":113,"text":"洗浆房","children":[]},{"id":114,"text":"污水处理站","children":[]}]},{"id":105,"text":"医务科","children":[{"id":115,"text":"急诊科","children":[]},{"id":116,"text":"住院部","children":[]},{"id":117,"text":"门诊部","children":[{"id":122,"text":"儿内","children":[]},{"id":123,"text":"儿外","children":[]},{"id":124,"text":"耳鼻喉科","children":[]},{"id":125,"text":"眼科","children":[]},{"id":126,"text":"口腔科","children":[]},{"id":127,"text":"中医科","children":[]}]},{"id":118,"text":"药械科","children":[]},{"id":119,"text":"放射科","children":[]},{"id":120,"text":"检验科","children":[]},{"id":121,"text":"输血科","children":[]}]},{"id":106,"text":"护理部","children":[]},{"id":107,"text":"院感科","children":[]}],"id":100,"text":"医院"}]; 
	var country_combotree = [{"children":[{"id":201,"text":"广东","children":[]},{"id":202,"text":"北京","children":[]},{"id":203,"text":"上海","children":[]},{"id":204,"text":"广州","children":[]},{"id":205,"text":"深圳","children":[]}],"id":200,"text":"中国"}];
	var brand_combobox = ﻿[{"text":"所有品牌","value":300},{"text":"神州行","value":301},{"text":"全球通","value":302},{"text":"动感地带","value":303}];
	////////////////////////////////第一次加载页面各个组件的显示或隐藏
	$('#radar_div_var_custom').hide();//隐藏起始时间下拉框
	//$('#radar_div_var_dim').hide();//隐藏选择横轴维度下拉框
	$('#radar_time_date_s').next(".combo").hide();//隐藏选择起始日期组件
	//$('#radar_button_makechart').hide();//隐藏生成图表按钮
	//$('#radar_div_chart_var').hide();//隐藏图形参数设置div
	
	////////////////////////////////第一次打开页面加载缓存
//	$.ajax({
//		url : "InitServlet",
//		error : function(){
//			alert("加载缓存失败");
//		}
//	})
	
	
	$("#radar_rate").combobox({
		valueField : 'value',
		textField : 'text',
		data : options_rate,
		panelHeight : 'auto',

		// 设置初始值
		onLoadSuccess : function() {
			var data = $('#radar_rate').combobox('getData');
			$('#radar_rate').combobox('select', data[0].value);
		}
	});
	
	$("#radar_1_charttype").combobox({
		valueField : 'value',
		textField : 'text',
		data : options_charttype,
		panelHeight : 'auto',
		value : '折线'
	});
	
	$("#radar_2_charttype").combobox({
		valueField : 'value',
		textField : 'text',
		data : options_charttype,
		panelHeight : 'auto',
		value : '折线'
	});
	
	$("#radar_3_charttype").combobox({
		valueField : 'value',
		textField : 'text',
		data : options_charttype,
		panelHeight : 'auto',
		value : '折线'
	});
	
	$("#radar_2").combotree('loadData',area_combotree);
	$("#radar_2").combotree({
		animate : true,
		valueField : 'id',
		textField : 'text',
		panelHeight : 'auto',
		value : '护理部',
	});
	
	$("#radar_1_3").combotree('loadData',country_combotree);
	$("#radar_1_3").combotree({
		animate : true,
		valueField : 'id',
		textField : 'text',
		panelHeight : 'auto',
		value : '全国',
	});
	
	$("#radar_2_4").combobox({
		valueField : 'value',
		textField : 'text',
		data : brand_combobox,
		panelHeight : 'auto',
		value : '全部'
	});
	
	
	$("#radar_var_dim").combobox({
		valueField : 'value',
		textField : 'text',
		data : options_fre,
		panelHeight : 'auto',
		value : '部门'
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	////////////////////////////////窗口属性 事件 及子组件属性
	// 设置窗口属性
	$('#radar_window_kpi').window({
		title : 'Select_Kpi',
		modal : true,
		shadow : true,
		closed : true,
		iconCls : 'icon-search',
		width : 300,
		height : 400,
		padding : 10,
		minimizable : false,
		maximizable : false,
		top : ($(window).height() - 300) * 0.5,
		left : ($(window).width() - 400) * 0.5,
		
		onOpen : function(){
//			// 加载窗口树
			$.ajax({
				url : "../ajax/SelectKpi.json",
				dataType : "json",
				success : function(data) {
					$('#radar_tree_kpi').tree('loadData', data);
				},
				error : function() {
					alert("树有问题");
				}
			})
			// 加载窗口表格
			$.ajax({
				url : "../ajax/SearchKpi.json",
				dataType : "json",
				success : function(data) {
					$('#radar_dg_kpi').datagrid('loadData', data);
				},
				error : function() {
					alert("表有问题");
				}
			})
		},
	})
	
	//窗口点击选择事件
	$('#radar_win_tool').children(':first').click(function () {
		//定义变量存放用户在小窗口选择的Kpi_id和Kpi_name
		var text = '';
		var id = '';
		//定义变量存放用户选择的Kpi节点node
		var nodes;
		var Kpi = ['1','2','3','4'];
		//删除所有当前存在的Kpi标签页
		var tabs = $("#radar_tabs").tabs("tabs");
		var length = tabs.length;
		for(var i = 0; i < length; i++) {
		    var onetab = tabs[0];
		    var title = onetab.panel('options').tab.text();
		    $("#radar_tabs").tabs("close", title);
		}
		//找到当前小窗口中选中的标签 全部 搜索
		var selValue = $('#radar_tab_kpi').find('.tabs-selected').text();
		console.log(selValue,"dfg");
		if (selValue == "全部") {
			//在全部标签页的树中选择Kpi
			nodes = $('#radar_tree_kpi').tree('getChecked');
			for(var i=0; i<nodes.length; i++){
				if (text != '')
					text += ',';
				text += nodes[i].text;
				if (id != '')
					id += ',';
				id += nodes[i].id;
			}
		} else if (selValue == "搜索"){
			//在搜索标签页中选择Kpi
			nodes = $('#radar_dg_kpi').datagrid('getChecked');
			text = '';
			id = '';
			for(var i=0; i<nodes.length; i++){
				if (text != '')
					text += ',';
				text += nodes[i].text;
				if (id != '')
					id += ',';
				id += nodes[i].id;
			}
		}
		
		//关闭选择窗口
		$('#radar_tab_tools').find('a').html("编辑Kpi");
		$('#radar_window_kpi').window('close');
		
		//ajax加载每个Kpi标签页数据
		$.ajax({
			url : "../ajax/GetKpiTabs.txt",
			dataType : "text",
			nodes : nodes,
			success : function(data){
				//获取没一个Kpi对应的dim信息
				var kpi_dims_acc = data.split("/");
				//用户只选择了一个Kpi
				if(nodes.length == 1){//如果只有一个Kpi 则没有公共dim标签页
					var kpi_dims = kpi_dims_acc[0].split("@");
					//存放当前新增标签也的kpi_id
					var kpi_id = nodes[0].id;
					//生成标签页
					$('#radar_tabs').tabs('add',{
						title : nodes[0].text,
						content : function(){
							//存放html代码
							var con = "";
							//循环读取每一个Kpi的dim
							for(var j=0; j<kpi_dims.length; j++){
								var dim = kpi_dims[j].split(",");
								var dim_id = dim[0];
								var dim_name = dim[1];
								var dim_type = dim[2];
								//判断dim类型
								if(dim_type == "0"){//时间类型
									con += "<div id='radar_div_"+kpi_id+"_"+dim_id+"' style='padding:20px'>频率：<select id='radar_rate' class='easyui-combobox' style='width:70px;'></select>"+dim_name+":<input id='radar_time_date' class='easyui-datebox' style='width:120px;'/><select id='radar_time_ym' class='easyui-combobox' style='width:100px;'></select></div>";
								} else if(dim_type == "1"){//树类型
									con += '<div id="radar_div_'+kpi_id+"_"+dim_id+'" style="padding:20px">'+dim_name+'：<select id="radar_'+kpi_id+"_"+dim_id+'" class="easyui-combotree" style="width:150px;"></select></div>';
								} else if(dim_type == "2"){//列表类型
									con += '<div id="radar_div_'+kpi_id+"_"+dim_id+'" style="padding:20px">'+dim_name+'：<select id="radar_'+kpi_id+"_"+dim_id+'" class="easyui-combobox" style="width:150px;"></select></div>';
								}
							} 
							con += '<div id="radar_div_'+kpi_id+'_charttype" style="padding:20px">展示类型：<select id="radar_'+kpi_id+'_charttype" class="easyui-combobox" style="width:70px;"></select></div>';
							return con;
						},
						closable : false
					})
					//拼接完成html，现在用ajax动态添加数据
					for(var j=0; j<kpi_dims.length; j++){
						var dim = kpi_dims[j].split(",");
						var dim_id = dim[0];
						var dim_name = dim[1];
						var dim_type = dim[2];
						//alert(dim_id+" "+dim_name+" "+dim_type+" "+kpi_id);
						if(dim_type == "1"){//树结构
							$.ajax({
								dim_id : dim_id,
								dim_name : dim_name,
								url : "../ajax/GetDimComboTree"+dim_id+".json",
								dataType : "json",
								success : function(tree){
									$('#radar_'+kpi_id+"_"+this.dim_id).combotree('loadData',tree);
									$('#radar_'+kpi_id+"_"+this.dim_id).combotree({
										animate : true,
										valueField : 'id',
										textField : 'text',
										panelHeight : 'auto',
										value : '请选择'+this.dim_name,
									});
								},
								error : function(){
									alert("树类型加载有问题");
								}
							})
						} else if(dim_type == "2"){//下拉列表结构
							$.ajax({
								dim_id : dim_id,
								dim_name : dim_name,
								url : "../ajax/GetDimComboBox"+dim_id+".json",
								dataType : "json",
								success : function(box){
									$('#radar_'+kpi_id+"_"+this.dim_id).combobox('loadData', box);
									$('#radar_'+kpi_id+"_"+this.dim_id).combobox({
										valueField : 'value',
										textField : 'text',
										panelHeight : 'auto',
										value : '请选择'+this.dim_name,
									});
								},
								error : function(){
									alert("下拉列表类型加载有问题");
								}
							})
						}
					}
					$('#radar_'+kpi_id+'_charttype').combobox({
						valueField : 'value',
						textField : 'text',
						data : options_charttype,
						panelHeight : 'auto',

						// 设置初始值
						onLoadSuccess : function() {
							var data = $('#radar_'+kpi_id+'_charttype').combobox('getData');
							$('#radar_'+kpi_id+'_charttype').combobox('select', data[0].value);
						},
					})
				} else {//如果不止一个Kpi 则有公共dim标签页
					//生成公共dim标签页
					var kpi_dims = kpi_dims_acc[0].split("@");
					//生成标签页
					$('#radar_tabs').tabs('add',{
						title : '各指标公共维度',
						content : function(){
							var con = "";
							//循环读取每一个Kpi的dim
							for(var j=0; j<kpi_dims.length; j++){
								var dim = kpi_dims[j].split(",");
								var dim_id = dim[0];
								var dim_name = dim[1];
								var dim_type = dim[2];
								//判断dim类型
								if(dim_type == "0"){//时间类型
									con += "<div id='radar_div_"+dim_id+"' style='padding:20px'>频率：<select id='radar_rate' class='easyui-combobox' style='width:70px;'></select>"+dim_name+":<input id='radar_time_date' class='easyui-datebox' style='width:120px;'/><select id='radar_time_ym' class='easyui-combobox' style='width:100px;'></select></div>";
								} else if(dim_type == "1"){//树类型
									con += '<div id="radar_div_'+dim_id+'" style="padding:20px">'+dim_name+'：<select id="radar_'+dim_id+'" class="easyui-combotree" style="width:150px;"></select></div>';
								} else if(dim_type == "2"){//列表类型
									con += '<div id="radar_div_'+dim_id+'" style="padding:20px">'+dim_name+'：<select id="radar_'+dim_id+'" class="easyui-combobox" style="width:150px;"></select></div>';
								}
							} 
							return con;
						},
						closable : false
					})
					//拼接完成html，现在用ajax动态添加数据
					for(var j=0; j<kpi_dims.length; j++){
						var dim = kpi_dims[j].split(",");
						var dim_id = dim[0];
						var dim_name = dim[1];
						var dim_type = dim[2];
						//alert(dim_id+" "+dim_name+" "+dim_type+" "+kpi_id);
						if(dim_type == "1"){//树结构
							$.ajax({
								dim_id : dim_id,
								dim_name : dim_name,
								url : "../ajax/GetDimComboTree"+dim_id+".json",
								dataType : "json",
								success : function(tree){
									$('#radar_'+this.dim_id).combotree('loadData',tree);
									$('#radar_'+this.dim_id).combotree({
										animate : true,
										valueField : 'id',
										textField : 'text',
										panelHeight : 'auto',
										value : '请选择'+this.dim_name,
									});
								},
								error : function(){
									alert("公共树类型加载有问题");
								}
							})
						} else if(dim_type == "2"){//下拉列表结构
							$.ajax({
								dim_id : dim_id,
								dim_name : dim_name,
								url : "../ajax/GetDimComboBox"+dim_id+".json",
								dataType : "json",
								success : function(box){
									$('#radar_'+this.dim_id).combobox('loadData', box);
									$('#radar_'+this.dim_id).combobox({
										valueField : 'value',
										textField : 'text',
										panelHeight : 'auto',
										value : '请选择'+this.dim_name,
									});
								},
								error : function(){
									alert("公共下拉列表类型加载有问题");
								}
							})
						}
					}
					//循环Kpi 生成Kpi剩余dim标签页
					for(var i=1; i<kpi_dims_acc.length; i++){
						var kpi_dims = kpi_dims_acc[i].split("@");
						//获取当前标签页的kpi_id
						var kpi_id = this.nodes[i-1].id;
						//生成每个Kpi单独dim标签页
						$('#radar_tabs').tabs('add',{
							title : this.nodes[i-1].text,
							content : function(){
								//存放html代码
								var con = "";
								//循环读取每一个Kpi的dim
								for(var j=0; j<kpi_dims.length; j++){
									var dim = kpi_dims[j].split(",");
									var dim_id = dim[0];
									var dim_name = dim[1];
									var dim_type = dim[2];
									//判断dim类型
									if(dim_type == "1"){//树类型
										con += '<div id="radar_div_'+kpi_id+"_"+dim_id+'" style="padding:20px">'+dim_name+'：<select id="radar_'+kpi_id+"_"+dim_id+'" class="easyui-combotree" style="width:150px;"></select></div>';
									} else if(dim_type == "2"){//列表类型
										con += '<div id="radar_div_'+kpi_id+"_"+dim_id+'" style="padding:20px">'+dim_name+'：<select id="radar_'+kpi_id+"_"+dim_id+'" class="easyui-combobox" style="width:150px;"></select></div>';
									}
								} 
								con += '<div id="radar_div_'+kpi_id+'_charttype" style="padding:20px">展示类型：<select id="radar_'+kpi_id+'_charttype" class="easyui-combobox" style="width:70px;"></select></div>';
								return con;
							},
							closable : false
						})
						
						
						
						
						//拼接完成html，现在用ajax动态添加数据
						for(var j=0; j<kpi_dims.length; j++){
							var dim = kpi_dims[j].split(",");
							var dim_id = dim[0];
							var dim_name = dim[1];
							var dim_type = dim[2];
							//alert(dim_id+" "+dim_name+" "+dim_type+" "+kpi_id);
							if(dim_type == "1"){//树结构
								$.ajax({
									kpi_id : kpi_id,
									dim_id : dim_id,
									dim_name : dim_name,
									url : "../ajax/GetDimComboTree"+dim_id+".json",
									dataType : "json",
									success : function(tree){
										$('#radar_'+this.kpi_id+"_"+this.dim_id).combotree('loadData',tree);
										$('#radar_'+this.kpi_id+"_"+this.dim_id).combotree({
											animate : true,
											valueField : 'id',
											textField : 'text',
											panelHeight : 'auto',
											value : '请选择'+this.dim_name,
										});
									},
									error : function(){
										alert(this.kpi_id+"_"+this.dim_name+"树类型加载有问题");
									}
								})
							} else if(dim_type == "2"){//下拉列表结构
								$.ajax({
									kpi_id : kpi_id,
									dim_id : dim_id,
									dim_name : dim_name,
									url : "../ajax/GetDimComboBox"+dim_id+".json",
									dataType : "json",
									success : function(box){
										$('#radar_'+this.kpi_id+"_"+this.dim_id).combobox('loadData', box);
										$('#radar_'+this.kpi_id+"_"+this.dim_id).combobox({
											valueField : 'value',
											textField : 'text',
											panelHeight : 'auto',
											value : '请选择'+this.dim_name,
										});
									},
									error : function(){
										alert(this.kpi_id+"_"+this.dim_name+"下拉列表类型加载有问题");
									}
								})
							}
						}
						$('#radar_'+kpi_id+'_charttype').combobox({
							valueField : 'value',
							textField : 'text',
							data : options_charttype,
							panelHeight : 'auto',

							// 设置初始值
							onLoadSuccess : function() {
								var data = $('#radar_'+kpi_id+'_charttype').combobox('getData');
								$('#radar_'+kpi_id+'_charttype').combobox('select', data[0].value);
							},
						})
					}
				}

				
				
				// 频率下拉框属性设置
				$("#radar_rate").combobox({
					valueField : 'value',
					textField : 'text',
					data : options_rate,
					panelHeight : 'auto',

					// 设置初始值
					onLoadSuccess : function() {
						var data = $('#radar_rate').combobox('getData');
						$('#radar_rate').combobox('select', data[0].value);
					},

					// 时间combobox联动
					onChange : function(newVal, oldVal) {
						var selValue = $("#radar_rate").combobox('getValue');
						// 选择年份
						if (selValue == "year") {
							// 清楚原来ym这个select中的选项,显示年月下拉框，隐藏日期组件
							$("#radar_time_ym").combobox("clear");
							$('#radar_time_ym').next(".combo").show();
							$('#radar_time_date').next(".combo").hide();

							$("#radar_time_ym_s").combobox("clear");
							$('#radar_time_ym_s').next(".combo").show();
							$('#radar_time_date_s').next(".combo").hide();

							// 重新设置ym当前select中的选项
							$("#radar_time_ym").combobox({
								panelHeight : 'auto',
								data : options_time_year,
								// 设置初始值
								onLoadSuccess : function() {
									var data = $('#radar_time_ym').combobox('getData');
									$('#radar_time_ym').combobox('select', data[0].value);
								}
							});
							
							// 重新设置ym当前select中的选项
							$("#radar_time_ym_s").combobox({
								panelHeight : 'auto',
								data : options_time_year,
								// 设置初始值
								onLoadSuccess : function() {
									var data = $('#radar_time_ym_s').combobox('getData');
									$('#radar_time_ym_s').combobox('select', data[0].value);
								}
							});
						}
						// 选择月份
						if (selValue == "month") {
							// 清楚原来ym这个select中的选项，显示年月下拉框，隐藏日期组件
							$("#radar_time_ym").combobox("clear");
							$('#radar_time_ym').next(".combo").show();
							$('#radar_time_date').next(".combo").hide();
							
							$("#radar_time_ym_s").combobox("clear");
							$('#radar_time_ym_s').next(".combo").show();
							$('#radar_time_date_s').next(".combo").hide();

							// 重新设置ym当前select中的选项
							$("#radar_time_ym").combobox({
								panelHeight : '150',
								data : options_time_month,
								// 设置初始值
								onLoadSuccess : function() {
									var data = $('#radar_time_ym').combobox('getData');
									$('#radar_time_ym').combobox('select', data[0].value);
								}
							});
							
							// 重新设置ym当前select中的选项
							$("#radar_time_ym_s").combobox({
								panelHeight : '150',
								data : options_time_month,
								// 设置初始值
								onLoadSuccess : function() {
									var data = $('#radar_time_ym_s').combobox('getData');
									$('#radar_time_ym_s').combobox('select', data[0].value);
								}
							});
						}
						// 选择日期
						if (selValue == "day") {
							// 清楚原来ym这个select中的选项，显示年月下拉框，隐藏日期组件
							$("#radar_time_ym").combobox("clear");
							$('#radar_time_ym').next(".combo").hide();
							$('#radar_time_date').next(".combo").show();
							
							$("#radar_time_ym_s").combobox("clear");
							$('#radar_time_ym_s').next(".combo").hide();
							$('#radar_time_date_s').next(".combo").show();
						}
					}
				});
				//第一次刷新时，初始化候年月下拉框
				$("#radar_time_ym").combobox({
					valueField : 'value',
					textField : 'text',
					data : options_time_year,
					panelHeight : 'auto',

					// 设置初始值
					onLoadSuccess : function() {
						var data = $('#radar_time_ym').combobox('getData');
						$('#radar_time_ym').combobox('select', data[0].value);
					}
				});
				
				
				
				var dims_custom = kpi_dims_acc[0].split('@');
				var res = "";
				for(var i=0; i<dims_custom.length; i++){
					var dim = dims_custom[i].split(',');
					res += '{"text":"'+dim[1]+'","value":'+dim[0]+'},';
				}
				res = res.substring(0,res.length-1);
				res = '['+res+']';
				var jres = JSON.parse(res);
				//定义左中的变量值
				$("#radar_var_dim").combobox("clear");
				$('#radar_var_dim').combobox('loadData', jres);
				$("#radar_var_dim").combobox({
					// 设置初始值
					onLoadSuccess : function() {
						var data = $('#radar_var_dim').combobox('getData');
						$('#radar_var_dim').combobox('select', data[0].value);
					}
				});
				
				//显示该显示的组件
				$('#radar_div_var_dim').show();//显示选择横轴维度下拉框
				$('#radar_button_makechart').show();//显示生成图表按钮
				$('#radar_div_chart_var').show();//显示图形参数设置div
			},
			error :  function(){
				alert("Kpi不能为空");
			}
		})
	})
	
	//窗口点击关闭事件
	$('#radar_win_tool').children(':first').next().click(function () {
		$('#radar_window_kpi').window('close');
	})
	
	//设置窗口中的树属性
	$('#radar_tree_kpi').tree({
		method : 'get',
		animate : true,
		checkbox : true,
		cascadeCheck : false,//上下级检查
	})
	
	//设置窗口中的表格属性
	$('#radar_dg_kpi').datagrid({
		fitColumns : true,
		striped : true,//条文化
		singleSelect : false,
		method : 'get',
		rownumbers : true,
		fit : true,
		border : false,
		selectOnCheck : true,
		checkOnSelect : true,
	})
	
	///////////////////////////////////////其他组件
	
	//定义左中的变量值
	$('#radar_var_dim').combobox({
		valueField : 'value',
		textField : 'text',
		panelHeight : 'auto',
		
		// combobox联动
		onChange : function(newVal, oldVal) {
			var selValue = $("#radar_var_dim").combobox('getValue');
			//判断用户选择要做横轴的维度
			if(selValue == "1"){//用户选择了时间
				$('#radar_div_var_custom').show();
			} else {
				$('#radar_div_var_custom').hide();
			}
		}
	})
	
	$('#radar_button_makechart').click(function(){
		var myChart = echarts.init($('#radar_div_chart').get(0));
		myChart.setOption(lineoption);
	})
})


















