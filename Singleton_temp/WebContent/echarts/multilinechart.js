var multilineoption = {
		//标题
		title: {
			//主标题
			text: '2016年护理部各指标',
			//副标题
			subtext: '数据来自GWN'
		},
		//提示框
		tooltip: {
			//折线图提示框
			trigger: 'axis'
		},
		//图例
		legend: {
            top:'bottom',
			//数据
			data:['预算管理指标','预算执行率','应收账款周转天数']
		},
		//工具箱
		toolbox: {
			//是否显示
			show: true,
			//工具箱配置
			feature: {
				//数据区域缩放 直角坐标系支持
				dataZoom: {
					//缩放时控制的Y轴，为空则不控制所有Y轴，为false则控制Y轴
					yAxisIndex: false
				},
				//是否数据不可编辑，false表示可编辑
				dataView: {readOnly: false},
				//显示模式 line折线，bar柱状，stack堆叠，tiled平铺
				magicType: {type: ['line', 'bar']},
				//还原
				restore: {},
				//下载为图片
				saveAsImage: {}
			}
		},
		//横坐标
		xAxis:  {
			type: 'category',
			boundaryGap: true,
			data:['201601','201602','201603','201604','201605','201606','201607','201608'],
//			//坐标轴类型，value数据，category类型，time时间，
//			type: 'category',
//			//起点和重点数据是否定格，是否留白
//			boundaryGap: false,
//			//数据
//			data: ['周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日']
		},
		//纵坐标
		yAxis: [
		        {
		        	type: 'value',
		        	name: '单位元',
		        	position : 'left',
		        	offset : 0,
		        	axisLabel: {formatter: '{value} 万'},
//			type: 'value',
//			//纵坐标显示标签
//			axisLabel: {
//				formatter: '{value} °C'
//			}
		        },
		        {
		        	type :'value',
		        	name :'单位百分比',
		        	position: 'right',
		        	offset: 0,
		        	axisLabel: {formatter: '{value} %'},
		        },
		        {
		        	type :'value',
		        	name :'天数',
		        	position : 'right',
		        	offset :40,
		        	axisLabel: {formatter: '{value} 天'},
		        }
		],
		series: 
		[
		 //准备添加的数据
		 {
			 name:'预算管理指标',
			 //折线图
			 type:'line',
			 //数据
			 data:[53,67,74,88,91,106,119,127],
			 yAxisIndex : 0
		 },
		 {
			 name:'预算执行率',
			 //折线图
			 type:'line',
			 //数据
			 data:[41,56,79,83,105,114,131,149],
			 yAxisIndex : 1
		 },
		 {
			 name:'应收账款周转天数',
			 //折线图
			 type:'bar',
			 //数据
			 data:[81,82,93,94,105,106,117,118],
			 yAxisIndex : 2
		 }
			//最高气温表
//			{
//				name:'最高气温',
//				//折线图
//				type:'line',
//				//数据
//				data:[11, 11, 15, 13, 12, 13, 10, 11, 11, 14, 13, 12, 13, 11],
//				//图表标注
//				markPoint: {
//					data: [
//						//最大最小值
//						{type: 'max', name: '最大值'},
//						{type: 'min', name: '最小值'}
//					]	
//				},	
//				//图表标线
//				markLine: {
//					data: [
//						//平均值
//						{type: 'average', name: '平均值'}
//					]	
//				}	
//			},	
			//最低气温表
//			{
//				name:'最低气温',
//				type:'line',
//				data:[1, -2, 2, 5, 3, 2, 0, 1, -1, 2, 4, 3, 2, 0],
//				markPoint: {
//					data: [
//						{name: '周最低', value: -2, xAxis: 1, yAxis: -2},
//						{name: '周最高', value: 5, xAxis: 3, yAxis: 5}
//					]
//				},
//				markLine: {
//					data: [
//						{type: 'average', name: '平均值'},
//						//自定义样式
//						[
//						//起始点
//						{	
//							//起始点样式
//							symbol: 'circle',
//							//起始点x坐标位置
//							x: '90%',
//							//起始点Y坐标位置
//							yAxis: 'max'
//						}, 
//						//终点
//						{
//							//终点样式
//							symbol: 'circle',
//							//标签样式
//							label: {
//								normal: {
//									//标签出现位置
//									position: 'start',
//									//标签格式
//									formatter: '最大值'
//								}
//							},
//							type: 'max',
//							name: '最高点'
//						}]
//					]
//				}
//			}
		]
	};