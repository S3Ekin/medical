var chart = null;
function render_charts1(option, series, id, data, reset){
    //组装数据
	//data 例子：{'name': '科研成果','catalog':['2013','2014','2015','2016'],'series':[{'name':'国内论文数ISSN','data':['--','--',350,362]}
    var legends = [], opt = T.json.parse(T.json.stringify(option));
    for(var m in data['series']){//循环拆解data里面的series数组中的每个属性
        var ser = T.json.parse(T.json.stringify(series)); //将传入进来的series属性json进行动态设置，完成echats中的series设置       
        var item = data['series'][m];
        var txt = item['name'];
        var std = item['standar'] || 0;
        ser.name = txt;
        ser.data = item['data'];
        if(std > 0){
            var temp_data1 = ser.markLine.data[0];
            temp_data1[0].value = std;
            temp_data1[0].yAxis = std;
            temp_data1[1].yAxis = std;
        }else{
            ser.markLine = {};
        }
        opt.series[m] = ser;
        legends.push(txt);
    }
    opt.title.text = data['name'];
    opt.legend.data = legends;
    opt.xAxis.data = data['catalog'];

    //standar  为某个值设置标线 name是这个标线显示的名称  value是这个标线的的值
    var std = data.standar || { value:0 };
    if(std.value > 0){
        opt.series[0].markLine = { lineStyle: { normal: {type: 'dashed', color:'#d14a61'}}, data : [[{symbol:'circle',yAxis: std.value,x:'6%',name:'三甲标准',value: std.value}, {label: {normal: {formatter: '',}},symbol:'circle',yAxis: std.value,x:'99%',name:'三甲标准'}]]};
    }

    //y1max
    var y1max = data.y1max || 0;
    if(y1max > 0){
        if(Object.prototype.toString.call(opt.yAxis) == '[object Array]'){
            opt.yAxis[0].max = y1max;
        }else{
            opt.yAxis.max = y1max;
        }
    }

    //y2max
    var y2max = data.y2max || 0;
    if(y2max > 0){
        if(Object.prototype.toString.call(opt.yAxis) == '[object Array]'){
            opt.yAxis[1].max = y2max;
        }
    }

    //y1min
    var y1min = data.y1min || 0;
    if(y1min > 0){
        opt.yAxis.min = y1min;
    }

    //y2min
    var y2min = data.y2min || 0;
    if(y2min > 0){
    	if(Object.prototype.toString.call(opt.yAxis) == '[object Array]'){
    		opt.yAxis[1].min = y2min;
    	}
    }    
    
    //reset
    reset && reset(opt);

    //render
    chart = echarts.init(document.getElementById(id), 'macarons');
    chart.setOption(opt);
    return chart;
}
function render_charts2(option, series, id, data, reset){
    //组装数据
	//data 例子：{'name': '科研成果','catalog':['2013','2014','2015','2016'],'series':[{'name':'国内论文数ISSN','data':['--','--',350,362]}
    var legends = [], opt = T.json.parse(T.json.stringify(option));
    for(var m in data['series']){//循环拆解data里面的series数组中的每个属性
        var ser = T.json.parse(T.json.stringify(series)); //将传入进来的series属性json进行动态设置，完成echats中的series设置
        var item = data['series'][m];
        var txt = item['name'];
        var std = item['standar'] || 0;
        ser.name = txt;
        ser.data = item['data'];
        if(std > 0){
            var temp_data1 = ser.markLine.data[0];
            temp_data1[0].value = std;
            temp_data1[0].yAxis = std;
            temp_data1[1].yAxis = std;
        }else{
            ser.markLine = {};
        }
        opt.series[m] = ser;
        legends.push(txt);
    }
    opt.title.text = data['name'];
    opt.legend.data = legends;
    opt.xAxis.data = data['catalog'];

    //standar  为某个值设置标线 name是这个标线显示的名称  value是这个标线的的值
    var std = data.standar || { value:0 };
    if(std.value > 0){
        opt.series[0].markLine = { lineStyle: { normal: {type: 'dashed', color:'#d14a61'}}, data : [[{symbol:'circle',yAxis: std.value,x:'15%',name:'三甲标准',value: std.value}, {label: {normal: {formatter: '',}},symbol:'circle',yAxis: std.value,x:'99%',name:'三甲标准'}]]};
    }    

    //y1max
    var y1max = data.y1max || 0;
    if(y1max > 0){
        if(Object.prototype.toString.call(opt.yAxis) == '[object Array]'){
            opt.yAxis[0].max = y1max;
        }else{
            opt.yAxis.max = y1max;
        }
    }

    //y2max
    var y2max = data.y2max || 0;
    if(y2max > 0){
        if(Object.prototype.toString.call(opt.yAxis) == '[object Array]'){
            opt.yAxis[1].max = y2max;
        }
    }

    //y1min
    var y1min = data.y1min || 0;
    if(y1min > 0){
        opt.yAxis.min = y1min;
    }

    //y2min
    var y2min = data.y2min || 0;
    if(y2min > 0){
    	if(Object.prototype.toString.call(opt.yAxis) == '[object Array]'){
    		opt.yAxis[1].min = y2min;
    	}
    }    
    
    //reset
    reset && reset(opt);

    //render
    chart = echarts.init(document.getElementById(id), 'macarons');
    chart.setOption(opt);
}

function render_charts3(option, series, id, data, reset){
    //组装数据
    var legends = [], opt = T.json.parse(T.json.stringify(option));
    for(var m in data['series']){
        var ser = T.json.parse(T.json.stringify(series));
        var item = data['series'][m];
        var txt = item['name'];
        var std = item['standar'] || 0;
        ser.name = txt;
        ser.data = item['data'];
        if(std > 0){
            ser.markLine.data[0].yAxis = std;
        }else{
            ser.markLine = {};
        }
        opt.series[m] = ser;
        legends.push(txt);
    }
    opt.title.text = data['name'];
    opt.legend.data = legends;
    opt.xAxis.data = data['catalog'];

    //standar
    var std = data.standar || { value:0 };
    if(std.value > 0){
        opt.series[0].markLine = { lineStyle: { normal: {type: 'dashed', color:'#d14a61'}}, data : [{ name: std.name, yAxis: std.value}]};
    }

    //y1max
    var y1max = data.y1max || 0;
    if(y1max > 0){
        if(Object.prototype.toString.call(opt.yAxis) == '[object Array]'){
            opt.yAxis[0].max = y1max;
        }else{
            opt.yAxis.max = y1max;
        }
    }

    //y1max
    var y2max = data.y2max || 0;
    if(y2max > 0){
        if(Object.prototype.toString.call(opt.yAxis) == '[object Array]'){
            opt.yAxis[1].max = y2max;
        }
    }

    //y1min
    var y1min = data.y1min || 0;
    if(y1min > 0){
        opt.yAxis.min = y1min;
    }

    //reset
    reset && reset(opt);

    //render
    chart = echarts.init(document.getElementById(id), 'macarons');
    chart.setOption(opt);
}

function render_table(tpl, des, data){
    _get(des).innerHTML = baidu.template(tpl, data);

}

//y2坐标轴确定
function y2Cal(data) {
	var max=0,min=0,result,count=1;
	//取最大值，最小值
	for(var i=0;i<data.length;i++) {
		if(data[i]!='--') {
			if(count==1) {
				max=data[i];
				min=data[i]
				count=0;
			}else {
				if(data[i]>max) {
					max=data[i];					
				}
				if(data[i]<min) {
					min=data[i];
				}
			}
		}
	}
	max*=1.2;
	min*=0.8;
	if(max>100) max=100;
	if(max<1) max=1;
	result={'max':Math.round(max),'min':parseInt(min*0.8)};
	return result;
}
