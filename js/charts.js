/* ===== ECharts Initialization ===== */
const Charts = {

    // Weekly trend bar chart
    weeklyTrend(elementId) {
        const el = document.getElementById(elementId);
        if (!el || !window.echarts) return;

        const chart = echarts.init(el);
        const data = Store.weeklyData;

        const option = {
            grid: {
                left: 40,
                right: 20,
                top: 20,
                bottom: 30
            },
            xAxis: {
                type: 'category',
                data: data.map(d => d.day),
                axisLine: { lineStyle: { color: '#E0E0E0' } },
                axisLabel: { color: '#999', fontSize: 11 }
            },
            yAxis: {
                type: 'value',
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { lineStyle: { color: '#F5F5F5' } },
                axisLabel: { color: '#999', fontSize: 11 }
            },
            series: [{
                data: data.map(d => d.distance),
                type: 'bar',
                barWidth: '40%',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#FFD100' },
                        { offset: 1, color: '#FFC300' }
                    ]),
                    borderRadius: [4, 4, 0, 0]
                },
                label: {
                    show: true,
                    position: 'top',
                    color: '#666',
                    fontSize: 10,
                    formatter: '{c}km'
                }
            }]
        };

        chart.setOption(option);
        window.addEventListener('resize', () => chart.resize());
    },

    // Distance trend line chart
    distanceTrend(elementId, days = 7) {
        const el = document.getElementById(elementId);
        if (!el || !window.echarts) return;

        const chart = echarts.init(el);
        const data = Store.weeklyData;

        const option = {
            grid: {
                left: 40,
                right: 20,
                top: 30,
                bottom: 30
            },
            xAxis: {
                type: 'category',
                data: data.map(d => d.day),
                boundaryGap: false,
                axisLine: { lineStyle: { color: '#E0E0E0' } },
                axisLabel: { color: '#999', fontSize: 11 }
            },
            yAxis: {
                type: 'value',
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { lineStyle: { color: '#F5F5F5' } },
                axisLabel: { color: '#999', fontSize: 11 }
            },
            series: [{
                data: data.map(d => d.distance),
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: {
                    color: '#4A90E2',
                    width: 3
                },
                itemStyle: {
                    color: '#4A90E2',
                    borderColor: '#fff',
                    borderWidth: 2
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(74,144,226,0.3)' },
                        { offset: 1, color: 'rgba(74,144,226,0.05)' }
                    ])
                }
            }]
        };

        chart.setOption(option);
        window.addEventListener('resize', () => chart.resize());
    },

    // Area distribution pie chart
    areaDistribution(elementId) {
        const el = document.getElementById(elementId);
        if (!el || !window.echarts) return;

        const chart = echarts.init(el);
        const areas = Store.areas.filter(a => a.explored);

        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}km ({d}%)'
            },
            legend: {
                bottom: 10,
                left: 'center',
                textStyle: { fontSize: 11, color: '#666' }
            },
            series: [{
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '45%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 8,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    fontSize: 11,
                    formatter: '{b}\n{c}km'
                },
                data: areas.map(a => ({
                    name: a.name,
                    value: a.distance
                })),
                color: ['#FFD100', '#4A90E2', '#52C41A', '#FF6B00', '#9C27B0']
            }]
        };

        chart.setOption(option);
        window.addEventListener('resize', () => chart.resize());
    }
};
