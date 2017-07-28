$(function() {
	// 动态从数据库中加载科室树
	$.ajax({
		url :  __contextpath+"/main/init.do",
		dataType : "json",
		success : function(area) {
			// 加载窗口树
			$.ajax({
				url : __contextpath+"/main/selectKpi.do",
				dataType : "json",
				beforeSend:function(){$("#tree_kpi").text("loading......");}, 
				success : function(data) {
					$("#tree_kpi").text("");
					$('#tree_kpi').tree('loadData', data);
				},
				error : function() {
					alert("树有问题");
				}
			})
			// 加载窗口表格
			$.ajax({
				url : __contextpath+"/main/searchKpi.do",
				dataType : "json",
				success : function(data) {
					$('#db_kpi').datagrid('loadData', data);
				},
				error : function() {
					alert("表有问题");
				}
			})
		},
		error : function(){
			alert("初始化有问题");
		}
	})

	// 设置窗口属性
	$('#window_kpi').window({
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
		left : ($(window).width() - 400) * 0.5
	})

	// 设置选择kpi树属性
	$('#tree_kpi').tree({
		method : 'get',
		onlyLeafCheck : 'true',
		cascadeCheck : false,//上下级检查
		animate : true,
		checkbox : true,
		onlyLeafCheck : 'true',//只在子节点前显示复选框
	})
	
	$('#pie_div_dim1').hide();
	$('#pie_div_dim2').hide();
	$('#pie_div_chart_dim1').hide();
	$('#pie_div_ym').hide();
	$('#pie_div_date').hide();
	$('#pie_div_chart_dims').hide();
	$('#pie_div_radius1').hide();
	
	// 地区下拉框属性
	$("#pie_sel_area").combotree({
		animate : true,
		valueField : 'value',
		textField : 'text',
		panelHeight : '250',
		value : '请选择科室',
	});
	
	var options_charttype = [{text:"饼状图",value:"pie"},{text:"折线图",value:"line"}]
	
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
	
	$('#pie_sel_charttype').combobox({
		valueField : 'value',
		textField : 'text',
		data : options_charttype,
		panelHeight : 'auto',
		
		// 设置初始值
		onLoadSuccess : function() {
			var data = $('#pie_sel_charttype').combobox('getData');
			$('#pie_sel_charttype').combobox('select', data[0].value);
		},
		
		// 时间combobox联动
		onChange : function(newVal, oldVal) {
			var selValue = $("#pie_sel_charttype").combobox('getValue');
			if(selValue == "pie"){
				//选择生成饼图
				$('#pie_p_var').html("选择占比的维度：");
				$('#pie_p_title').html("修改饼状图标题");
				$('#pie_div_isrose').show();
			} else if(selValue == "line") {
				//选择生成折线图
				$('#pie_p_var').html("选择作为横轴的维度：");
				$('#pie_p_title').html("修改折线图标题");
				$('#pie_div_isrose').hide();
			}
		}
	})
	
	// 频率下拉框属性设置
	$("#pie_sel_rate").combobox({
		valueField : 'value',
		textField : 'text',
		data : options_rate,
		panelHeight : 'auto',

		// 设置初始值
		onLoadSuccess : function() {
			var data = $('#pie_sel_rate').combobox('getData');
			$('#pie_sel_rate').combobox('select', data[0].value);
		},

		// 时间combobox联动
		onChange : function(newVal, oldVal) {
			var selValue = $("#pie_sel_rate").combobox('getValue');
			// 选择年份
			if (selValue == "year") {
				// 清楚原来ym这个select中的选项,显示年月下拉框，隐藏日期组件
				$("#pie_sel_time_ym").combobox("clear");
				$('#pie_sel_time_ym').next(".combo").show();
				$('#pie_sel_time_date').next(".combo").hide();
				
				$("#pie_sel_time_ym_f").combobox("clear");
				$('#pie_div_ym').show();
				$('#pie_div_date').hide();

				// 重新设置ym当前select中的选项
				$("#pie_sel_time_ym").combobox({
					panelHeight : 'auto',
					data : options_time_year,
					// 设置初始值
					onLoadSuccess : function() {
						var data = $('#pie_sel_time_ym').combobox('getData');
						$('#pie_sel_time_ym').combobox('select', data[0].value);
					}
				});
				
				// 重新设置ym当前select中的选项
				$("#pie_sel_time_ym_f").combobox({
					panelHeight : 'auto',
					data : options_time_year,
					// 设置初始值
					onLoadSuccess : function() {
						var data = $('#pie_sel_time_ym_f').combobox('getData');
						$('#pie_sel_time_ym_f').combobox('select', data[0].value);
					}
				});
			}
			// 选择月份
			if (selValue == "month") {
				// 清楚原来ym这个select中的选项，显示年月下拉框，隐藏日期组件
				$("#pie_sel_time_ym").combobox("clear");
				$('#pie_sel_time_ym').next(".combo").show();
				$('#pie_sel_time_date').next(".combo").hide();

				// 重新设置ym当前select中的选项
				$("#pie_sel_time_ym").combobox({
					panelHeight : '150',
					data : options_time_month,
					// 设置初始值
					onLoadSuccess : function() {
						var data = $('#pie_sel_time_ym').combobox('getData');
						$('#pie_sel_time_ym').combobox('select', data[0].value);
					}
				});
				
				$("#pie_sel_time_ym_f").combobox("clear");
				$('#pie_div_ym').show();
				$('#pie_div_date').hide();

				// 重新设置ym当前select中的选项
				$("#pie_sel_time_ym_f").combobox({
					panelHeight : '150',
					data : options_time_month,
					// 设置初始值
					onLoadSuccess : function() {
						var data = $('#pie_sel_time_ym_f').combobox('getData');
						$('#pie_sel_time_ym_f').combobox('select', data[0].value);
					}
				});
			}
			// 选择日期
			if (selValue == "day") {
				// 清楚原来ym这个select中的选项，显示年月下拉框，隐藏日期组件
				$("#pie_sel_time_ym").combobox("clear");
				$('#pie_sel_time_ym').next(".combo").hide();
				$('#pie_sel_time_date').next(".combo").show();
				
				$("#pie_sel_time_ym_f").combobox("clear");
				$('#pie_div_ym').hide();
				$('#pie_div_date').show();
			}
		}
	});
	
	//第一次刷新时，初始化候年月下拉框
	$("#pie_sel_time_ym").combobox({
		valueField : 'value',
		textField : 'text',
		data : options_time_year,
		panelHeight : 'auto',

		// 设置初始值
		onLoadSuccess : function() {
			var data = $('#pie_sel_time_ym').combobox('getData');
			$('#pie_sel_time_ym').combobox('select', data[0].value);
		}
	});
	
	//第一次刷新时，初始化候年月下拉框
	$("#pie_sel_time_ym_f").combobox({
		valueField : 'value',
		textField : 'text',
		data : options_time_year,
		panelHeight : 'auto',

		// 设置初始值
		onLoadSuccess : function() {
			var data = $('#pie_sel_time_ym_f').combobox('getData');
			$('#pie_sel_time_ym_f').combobox('select', data[0].value);
		}
	});
	
	$('#pie_sel_dim_chart').combobox({
		valueField : 'value',
		textField : 'text',
		panelHeight : 'auto',
		value : "请选择维度",
		
		// 设置初始值
		onLoadSuccess : function() {
			var data = $('#pie_sel_dim_chart').combobox('getData');
			$('#pie_sel_dim_chart').combobox('select', data[0].value);
		},
	
		// 占比维度combobox联动
		onChange : function(newVal, oldVal) {
			var selValue = $("#pie_sel_dim_chart").combobox('getValue');
			if(selValue == "1"){
				$('#pie_div_chart_dim1').show();
			}
			if(selValue == "2"){
				$('#pie_div_chart_dim1').hide();
			}
		}
	});
	
	$('#button_makechart').click(function(){
		//获取用户选择的占比的维度
		var dim_id = $('#pie_sel_dim_chart').combobox('getValue');
		//读取除了时间外的所有维度
		var div_dims = $('#pie_div_dims').children();
		//获取kpi_id
		var kpi_id = div_dims.eq(0).find('select').attr('id').split('_')[1];
		//获取kpi_name
		var kpi_name = $('#pie_button_kpi').html();
		var dims = "";
		var rate = $('#pie_sel_rate').combobox('getValue');
		if(dim_id == "1"){//选择做横轴的维度为时间
			if(rate == "year" || rate == "month"){//如果选择频率是年或月
				dim1 = "dim1@"+$('#pie_sel_time_ym_f').combobox('getValue')+","+$('#pie_sel_time_ym').combobox('getValue')+","+rate;
			} else {//如果选择的时间是日期
				var time = $('#pie_sel_time_date').datebox('getValue');
				var time_s = $('#pie_sel_time_date_f').datebox('getValue');
				var temp = time.split("-");
				var time = temp[0]+temp[1]+temp[2];
				temp = time_s.split("-");
				var time_s = temp[0]+temp[1]+temp[2];
				dim1 = "dim1@"+time_s+","+time+","+rate;
			}
		}else {//不为时间
			if(rate == "year" || rate == "month"){//如果选择频率是年或月
				dim1 = "dim1@"+$('#pie_sel_time_ym').combobox('getValue')+","+rate;
			} else {//如果选择的时间是日期
				var time = $('#pie_sel_time_date').datebox('getValue');
				var temp = time.split("-");
				var time = temp[0]+temp[1]+temp[2];
				dim1 = "dim1@"+time+","+rate;
			}
		}
		dims = dims+dim1+"^";
		for(var i=0; i<div_dims.length; i++){
			temp = div_dims.eq(i).attr('id').split('_')[2];//如dim2，dim3
			temp_dim_id = temp.substring(3,temp.length);
			if(temp_dim_id == "2"){//维度2 树结构
				var dim2 = "dim2@"+$("#pie_"+kpi_id+"_dim2").combotree('tree').tree('getSelected').id;
				dims = dims+dim2+"^";
			} else if(temp_dim_id == "3"){//维度3 树结构
				var dim3 = "dim3@"+$("#pie_"+kpi_id+"_dim3").combotree('tree').tree('getSelected').id;
				dims = dims+dim3+"^";
			} else if(temp_dim_id == "4"){//维度4 表结构
				var dim4 = "dim4@"+$("#pie_"+kpi_id+"_dim4").combobox('getValue');
				dims = dims+dim4+"^";
			}
		}
		//选择饼状图的ajax
		$.ajax({
			url : __contextpath+"/main/getLegend.do?dims="+dims+"&dim_id="+dim_id,
			dataType : "text",
			success : function(legend) {
				//向后台数据哭传值并接受饼状图信息
				$.ajax({
					url : __contextpath+"/main/pieChart.do?dims="+dims+"&dim_id="+dim_id+"&kpi_id="+kpi_id,
					dataType : "json",
					success : function(data) {
						var title = $('#pie_text_title').textbox('getValue');
						if(title == ""){
							pieoption.title.text = kpi_name;
						} else {
							pieoption.title.text = $("#pie_text_title").textbox('getValue');
						}
						var roseType = $('input:radio[name="isrose"]:checked').val();
						var bool=false;
						if(roseType == "true"){
							bool = true;
						} else {
							bool = false;
						}
						//alert(bool);
						var len = legend.split(",");
						pieoption.legend.data=len;
						pieoption.series[0].roseType=bool;
						pieoption.series[0].data=data;
						var myChart = echarts.init($('#div_chart').get(0));
						myChart.setOption(pieoption);
					},
					error : function(){
						alert("数据有问题");
					}
				}
				)
			},
			error : function(){
				alert("legend有问题");
			}
		})
	})
})