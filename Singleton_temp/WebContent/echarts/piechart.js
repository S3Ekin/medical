var pieoption={
			title : {
				text: '预算管理指标',
				x:'center'
			},//标题
			
			tooltip : {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},//提示栏
			
			legend: {
			orient: 'vertical',
			left: 'left',
			data: ["院办公室","信息科","财务科","总务科","医务科","护理部","院感科"]
			},//内容项
			
			series : [
			{
				name: '支持人数及比例',
				type: 'pie',
				roseType:false,
				radius : ['10%','70%'],//相对内半径，外半径，100%代表高宽较小的一项的一半
				center: ['50%', '60%'],//相对横纵坐标的中心
				data:[{"name":"院办公室","value":"89"},{"name":"信息科","value":"90"},{"name":"财务科","value":"95"},{"name":"总务科","value":"85"},{"name":"医务科","value":"71"},{"name":"护理部","value":"82"},{"name":"院感科","value":"--"}],
				itemStyle: {
					emphasis: {
						shadowBlur: 40,//图片阴影模糊大小
						shadowOffsetX: 0,//阴影水平上的偏移距离
						shadowColor: 'rgba(0, 0, 0, 0.5)'
						//最后一项为透明度，前三个为rgb，3个0代表黑色
					}
				}
			}
			],
			
			toolbox:{
				feature:{
					saveAsImage:{},//保存图片按钮
					dataView:{},//显示数据
					restore:{},//还原
					}
			}//设置工具栏
		};