 require.config({
            paths: {
                echarts: 'js/echarts/build/dist'
            }
        });
         require(
            [
                'echarts',
                'echarts/chart/pie',   // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
                'echarts/chart/funnel'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById('echart'));
                var labelTop = {
                    normal : {
                        label : {
                            show : true,
                            position : 'center',
                            formatter : '{b}',
                            textStyle: {
                                baseline : 'bottom'
                            }
                        },
                        labelLine : {
                            show : false
                        }
                    }
                };
                var labelFromatter = {
                    normal : {
                        label : {
                            formatter : function (a,b,c){return 100 - c + '%'},
                            textStyle: {
                                baseline : 'top'
                            }
                        }
                    },
                }
                var labelBottom = {
                    normal : {
                        color: '#ccc',
                        label : {
                            show : true,
                            position : 'center'
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis: {
                        color: 'rgba(0,0,0,0)'
                    }
                };
                var radius = [50, 65];
                option = {
                    backgroundColor:['#fff'],
                    legend: {
                        x : 'center',
                        y : 'center',
                        data:[
                            'PHP','Mysql','LNMP','JavaScript','Linux',
                            'JQuery', 'PS', 'AI', 'Axure', 'FL'
                        ]
                    },
                    title : {
                        text: 'Skill',
                        subtext: '技能',
                        x: 'center'
                    },
                    toolbox: {
                        show : false,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            magicType : {
                                show: true, 
                                type: ['pie', 'funnel'],
                                option: {
                                    funnel: {
                                        width: '20%',
                                        height: '30%',
                                        itemStyle : {
                                            normal : {
                                                label : {
                                                    formatter : function (a,b,c){return 'other\n' + c + '%\n'},
                                                    textStyle: {
                                                        baseline : 'middle'
                                                    }
                                                }
                                            },
                                        } 
                                    }
                                }
                            },
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    series : [
                        {
                            type : 'pie',
                            center : ['10%', '30%'],
                            radius : radius,
                            x: '0%', // for funnel
                            itemStyle : labelFromatter,
                            data : [
                                {name:'other', value:10, itemStyle : labelBottom},
                                {name:'PHP', value:90,itemStyle : labelTop}
                            ]
                        },
                        {
                            type : 'pie',
                            center : ['30%', '30%'],
                            radius : radius,
                            x:'20%', // for funnel
                            itemStyle : labelFromatter,
                            data : [
                                {name:'other', value:30, itemStyle : labelBottom},
                                {name:'Mysql', value:70,itemStyle : labelTop}
                            ]
                        },
                        {
                            type : 'pie',
                            center : ['50%', '30%'],
                            radius : radius,
                            x:'40%', // for funnel
                            itemStyle : labelFromatter,
                            data : [
                                {name:'other', value:30, itemStyle : labelBottom},
                                {name:'LNMP', value:70,itemStyle : labelTop}
                            ]
                        },
                        {
                            type : 'pie',
                            center : ['70%', '30%'],
                            radius : radius,
                            x:'60%', // for funnel
                            itemStyle : labelFromatter,
                            data : [
                                {name:'other', value:30, itemStyle : labelBottom},
                                {name:'JavaScript', value:70,itemStyle : labelTop}
                            ]
                        },
                        {
                            type : 'pie',
                            center : ['90%', '30%'],
                            radius : radius,
                            x:'80%', // for funnel
                            itemStyle : labelFromatter,
                            data : [
                                {name:'other', value:35, itemStyle : labelBottom},
                                {name:'Linux', value:65,itemStyle : labelTop}
                            ]
                        },
                        {
                            type : 'pie',
                            center : ['10%', '70%'],
                            radius : radius,
                            y: '55%',   // for funnel
                            x: '0%',    // for funnel
                            itemStyle : labelFromatter,
                            data : [
                                {name:'other', value:20, itemStyle : labelBottom},
                                {name:'JQuery', value:80,itemStyle : labelTop}
                            ]
                        },
                        {
                            type : 'pie',
                            center : ['30%', '70%'],
                            radius : radius,
                            y: '55%',   // for funnel
                            x:'20%',    // for funnel
                            itemStyle : labelFromatter,
                            data : [
                                {name:'other', value:15, itemStyle : labelBottom},
                                {name:'PS', value:85,itemStyle : labelTop}
                            ]
                        },
                        {
                            type : 'pie',
                            center : ['50%', '70%'],
                            radius : radius,
                            y: '55%',   // for funnel
                            x:'40%', // for funnel
                            itemStyle : labelFromatter,
                            data : [
                                {name:'other', value:20, itemStyle : labelBottom},
                                {name:'AI', value:80,itemStyle : labelTop}
                            ]
                        },
                        {
                            type : 'pie',
                            center : ['70%', '70%'],
                            radius : radius,
                            y: '55%',   // for funnel
                            x:'60%', // for funnel
                            itemStyle : labelFromatter,
                            data : [
                                {name:'other', value:20, itemStyle : labelBottom},
                                {name:'Axure', value:80,itemStyle : labelTop}
                            ]
                        },
                        {
                            type : 'pie',
                            center : ['90%', '70%'],
                            radius : radius,
                            y: '55%',   // for funnel
                            x:'80%', // for funnel
                            itemStyle : labelFromatter,
                            data : [
                                {name:'other', value:50, itemStyle : labelBottom},
                                {name:'FL', value:50,itemStyle : labelTop}
                            ],
                            
                        },
                    ]
                };
                    
                myChart.setOption(option);
            }
        );