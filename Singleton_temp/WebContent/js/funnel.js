$(function() {
	// 动态从数据库中加载科室树
	$.ajax({
		url : "ajax/GetDimComboTree2.json",
		dataType : "json",
		success : function(area) {
			$('#funnel_sel_area').combotree('loadData', area);
			// 加载窗口树
			$.ajax({
				url : "ajax/SelectKpi.json",
				dataType : "json",
				success : function(data) {
					$('#tree_kpi').tree('loadData', data);
				},
				error : function() {
					alert("树有问题");
				}
			})
			// 加载窗口表格
			$.ajax({
				url : "ajax/SearchKpi.json",
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
			alert("ajax");
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
		animate : true
	})
	
	$('#funnel_div_dim1').hide();
	$('#funnel_div_dim2').hide();
	$('#funnel_div_chart_dim1').hide();
	$('#funnel_div_ym').hide();
	$('#funnel_div_date').hide();
	$('#funnel_div_chart_dims').hide();
	$('#funnel_div_radius1').hide();
	$('#funnel_div_isrose').hide();
	$('#funnel_sel_charttype').next('span').hide();
	
	// 地区下拉框属性
	$("#funnel_sel_area").combotree({
		animate : true,
		valueField : 'value',
		textField : 'text',
		panelHeight : '250',
		value : '请选择部门',
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
	$('#funnel_sel_charttype').combobox({
		valueField : 'value',
		textField : 'text',
		data : options_charttype,
		panelHeight : 'auto',
		
		// 设置初始值
		onLoadSuccess : function() {
			var data = $('#funnel_sel_charttype').combobox('getData');
			$('#funnel_sel_charttype').combobox('select', data[0].value);
		},
		
		// 时间combobox联动
		onChange : function(newVal, oldVal) {
			var selValue = $("#funnel_sel_charttype").combobox('getValue');
			if(selValue == "pie"){
				//选择生成饼图
				$('#funnel_p_var').html("选择占比的维度：");
				$('#funnel_p_title').html("修改饼状图标题");
				$('#funnel_div_isrose').show();
			} else if(selValue == "line") {
				//选择生成折线图
				$('#funnel_p_var').html("选择作为横轴的维度：");
				$('#funnel_p_title').html("修改折线图标题");
				$('#funnel_div_isrose').hide();
			}
		}
	})
	
	// 频率下拉框属性设置
	$("#funnel_sel_rate").combobox({
		valueField : 'value',
		textField : 'text',
		data : options_rate,
		panelHeight : 'auto',

		// 设置初始值
		onLoadSuccess : function() {
			var data = $('#funnel_sel_rate').combobox('getData');
			$('#funnel_sel_rate').combobox('select', data[0].value);
		},

		// 时间combobox联动
		onChange : function(newVal, oldVal) {
			var selValue = $("#funnel_sel_rate").combobox('getValue');
			// 选择年份
			if (selValue == "year") {
				// 清楚原来ym这个select中的选项,显示年月下拉框，隐藏日期组件
				$("#funnel_sel_time_ym").combobox("clear");
				$('#funnel_sel_time_ym').next(".combo").show();
				$('#funnel_sel_time_date').next(".combo").hide();
				
				$("#funnel_sel_time_ym_f").combobox("clear");
				$('#funnel_div_ym').show();
				$('#funnel_div_date').hide();

				// 重新设置ym当前select中的选项
				$("#funnel_sel_time_ym").combobox({
					panelHeight : 'auto',
					data : options_time_year,
					// 设置初始值
					onLoadSuccess : function() {
						var data = $('#funnel_sel_time_ym').combobox('getData');
						$('#funnel_sel_time_ym').combobox('select', data[0].value);
					}
				});
				
				// 重新设置ym当前select中的选项
				$("#funnel_sel_time_ym_f").combobox({
					panelHeight : 'auto',
					data : options_time_year,
					// 设置初始值
					onLoadSuccess : function() {
						var data = $('#funnel_sel_time_ym_f').combobox('getData');
						$('#funnel_sel_time_ym_f').combobox('select', data[0].value);
					}
				});
			}
			// 选择月份
			if (selValue == "month") {
				// 清楚原来ym这个select中的选项，显示年月下拉框，隐藏日期组件
				$("#funnel_sel_time_ym").combobox("clear");
				$('#funnel_sel_time_ym').next(".combo").show();
				$('#funnel_sel_time_date').next(".combo").hide();

				// 重新设置ym当前select中的选项
				$("#funnel_sel_time_ym").combobox({
					panelHeight : '150',
					data : options_time_month,
					// 设置初始值
					onLoadSuccess : function() {
						var data = $('#funnel_sel_time_ym').combobox('getData');
						$('#funnel_sel_time_ym').combobox('select', data[0].value);
					}
				});
				
				$("#funnel_sel_time_ym_f").combobox("clear");
				$('#funnel_div_ym').show();
				$('#funnel_div_date').hide();

				// 重新设置ym当前select中的选项
				$("#funnel_sel_time_ym_f").combobox({
					panelHeight : '150',
					data : options_time_month,
					// 设置初始值
					onLoadSuccess : function() {
						var data = $('#funnel_sel_time_ym_f').combobox('getData');
						$('#funnel_sel_time_ym_f').combobox('select', data[0].value);
					}
				});
			}
			// 选择日期
			if (selValue == "day") {
				// 清楚原来ym这个select中的选项，显示年月下拉框，隐藏日期组件
				$("#funnel_sel_time_ym").combobox("clear");
				$('#funnel_sel_time_ym').next(".combo").hide();
				$('#funnel_sel_time_date').next(".combo").show();
				
				$("#funnel_sel_time_ym_f").combobox("clear");
				$('#funnel_div_ym').hide();
				$('#funnel_div_date').show();
			}
		}
	});
	
	//第一次刷新时，初始化候年月下拉框
	$("#funnel_sel_time_ym").combobox({
		valueField : 'value',
		textField : 'text',
		data : options_time_year,
		panelHeight : 'auto',

		// 设置初始值
		onLoadSuccess : function() {
			var data = $('#funnel_sel_time_ym').combobox('getData');
			$('#funnel_sel_time_ym').combobox('select', data[0].value);
		}
	});
	
	//第一次刷新时，初始化候年月下拉框
	$("#funnel_sel_time_ym_f").combobox({
		valueField : 'value',
		textField : 'text',
		data : options_time_year,
		panelHeight : 'auto',

		// 设置初始值
		onLoadSuccess : function() {
			var data = $('#funnel_sel_time_ym_f').combobox('getData');
			$('#funnel_sel_time_ym_f').combobox('select', data[0].value);
		}
	});
	
	$('#funnel_sel_dim_chart').combobox({
		valueField : 'value',
		textField : 'text',
		panelHeight : 'auto',
		
		// 设置初始值
		onLoadSuccess : function() {
			var data = $('#funnel_sel_dim_chart').combobox('getData');
			$('#funnel_sel_dim_chart').combobox('select', data[0].value);
		},
	
		// 占比维度combobox联动
		onChange : function(newVal, oldVal) {
			var selValue = $("#funnel_sel_dim_chart").combobox('getValue');
			if(selValue == "1"){
				$('#funnel_div_chart_dim1').show();
			}
			if(selValue == "2"){
				$('#funnel_div_chart_dim1').hide();
			}
		}
	});
	
	$('#button_makechart').click(function(){
		//获取用户选择的占比的维度
		var selValue = $("#funnel_sel_dim_chart").combobox('getValue');
		var dim_id = $('#funnel_sel_dim_chart').combobox('getValue');
		var variable = new Array();
		//alert($("#funnel_sel_dim_chart").combobox('getValue'));
		if(selValue == "1"){
			//用户选择时间作为占比的维度
			var rate = $('#funnel_sel_rate').combobox('getValue');
			if(rate != "day"){
				//如果频率选择的年份或月份
				var time_s = $('#funnel_sel_time_ym_f').combobox('getValue');
				var time_f = $('#funnel_sel_time_ym').combobox('getValue');
				var keshi = $("#funnel_sel_area").combotree('tree').tree('getSelected').id;
				variable[0] = time_s+","+time_f+","+rate;
				variable[1] = keshi;
				variable[2] = dim_id+","+kpi_id;
			} else {
				//如果频率选择的日期
				var time_s = $('#funnel_sel_time_date_f').datebox('getValue');
				var time_f = $('#funnel_sel_time_date').datebox('getValue');
				var temp = time_s.split("/");
				time_s = temp[2]+temp[0]+temp[1];
				temp = time_f.split("/");
				time_f = temp[2]+temp[0]+temp[1];
				var keshi = $("#funnel_sel_area").combotree('tree').tree('getSelected').id;
				variable[0] = time_s+","+time_f+","+rate;
				variable[1] = keshi;
				variable[2] = dim_id+","+kpi_id;
			}
			
		} else {
			//用户选择科室作为占比的维度、
			//用户选择时间作为占比的维度
			var rate = $('#funnel_sel_rate').combobox('getValue');
			if(rate != "day"){
				//如果频率选择的年份或月份
				var time = $('#funnel_sel_time_ym').combobox('getValue');
				var keshi = $("#funnel_sel_area").combotree('tree').tree('getSelected').id;
				variable[0] = time+","+rate;
				variable[1] = keshi;
				variable[2] = dim_id+","+kpi_id;
			} else {
				//如果频率选择的日期
				var time = $('#funnel_sel_time_date').datebox('getValue');
				var temp = time.split("/");
				time = temp[2]+temp[0]+temp[1];
				var keshi = $("#funnel_sel_area").combotree('tree').tree('getSelected').id;
				variable[0] = time+","+rate;
				variable[1] = keshi;
				variable[2] = dim_id+","+kpi_id;
			}
		}
		//选择饼状图的ajax
		if($('#funnel_sel_charttype').combobox('getValue') == "pie"){
			$.ajax({
				url : "ajax/GetLegendServlet.json",
				dataType : "json",
				success : function(legend) {
					//向后台数据哭传值并接受饼状图信息
					$.ajax({
						url : "ajax/PieChartServlet.json",
						dataType : "json",
						success : function(data) {
							//$('#funnel_text_title').textbox('setValue','');
							var title = $('#funnel_text_title').textbox('getValue');
							if(title != ""){
								funneloption.title.text = title;
							} else {
								funneloption.title.text = $("#funnel_sel_area").combotree('tree').tree('getSelected').text;
							}
							//alert($('input:radio[name="isrose"]:checked').val());
							var roseType = $('input:radio[name="isrose"]:checked').val();
							var bool=false;
							if(roseType == "true"){
								bool = true;
							} else {
								bool = false;
							}
							//alert(bool);
							//pieoption.legend.data=legend;
							//pieoption.series[0].roseType=bool;
							//pieoption.series[0].data=data;
							var myChart = echarts.init($('#funnel_div_chart').get(0));
							myChart.setOption(funneloption);
						}
					})
				}
			})
		}
		//选择折线图ajax
		if($('#funnel_sel_charttype').combobox('getValue') == "line"){
			$.ajax({
				url : "GetLegendServlet?var0="+variable[0]+"&var1="+variable[1]+"&var2="+variable[2],
				dataType : "text",
				success : function(legend) {
					//向后台数据库传值并接受折现图信息
					$.ajax({
						url : "PieChartServlet?var0="+variable[0]+"&var1="+variable[1]+"&var2="+variable[2]+"&type=chartline",
						dataType : "text",
						success : function(data) {
							//$('#funnel_text_title').textbox('setValue','');
							var title = $('#funnel_text_title').textbox('getValue');
							if(title != ""){
								lineoption.title.text = title;
							} else {
								lineoption.title.text = $("#funnel_sel_area").combotree('tree').tree('getSelected').text;
							}
							//alert($('input:radio[name="isrose"]:checked').val());
							var roseType = $('input:radio[name="isrose"]:checked').val();
							var bool=false;
							if(roseType == "true"){
								bool = true;
							} else {
								bool = false;
							}
							//alert(bool);
							var len = legend.split(",");
							var line_data = data.split(",");
							
							//判断当前数据中是否有一个点有数据的flag
							var flag = false;
							for(var i=0; i<line_data.length; i++){
								if(line_data[i] != "--"){
									//说明有至少有一个值不为空
									flag = true;
								}
							}
							if(flag){
								//如果至少有一个点有数据
								for(var i=0; i<line_data.length; i++){
									if(line_data[i] == "--"){
										line_data[i] = "0";
									}
								}
							}
							//lineoption.xAxis.data=len;
							//lineoption.series[0].data=line_data;
							var myChart = echarts.init($('#funnel_div_chart').get(0));
							myChart.setOption(pieoption);
						}
					})
				}
			})
		}
	})

	// $('#ccc').click(function() {
	// alert("height:" + $(window).height());
	// alert("width:" + $(window).width());
	// })
})