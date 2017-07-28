var radaroption = {
    title: {
        text: '中国各地区指标雷达图'
    },
    tooltip: {},
    legend: {
        top:'bottom',
        data: ['预算管理指标','预算执行率','预算收入执行率']
    },
    radar: {
        // shape: 'circle',
        indicator: [
           { name: '北京', max: 6500},
           { name: '上海', max: 19000},
           { name: '广州', max: 30000},
           { name: '深圳', max: 38000},
           { name: '南京', max: 52000},
           { name: '厦门', max: 25000}
        ]
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
                value : [4300, 10000, 28000, 35000, 50000, 19000],
                name : '预算管理指标'
            },
             {
                value : [5000, 14000, 28000, 31000, 42000, 21000],
                name : '预算执行率'
            },
            {
                value : [5700, 18000, 30000, 27000, 34000, 23000],
                name : '预算收入执行率'
            }
        ]
    }]
};