var chartData = generateChartData(result);

var chart = AmCharts.makeChart("chart-view", {
    "type": "serial",
    "theme": "light",
    "legend": {
        "useGraphSettings": true
    },
    "dataProvider": chartData,
    "synchronizeGrid":true,
    "valueAxes": [{
        "id":"v1",
        "axisColor": "#ff2bd4",
        "axisThickness": 2,
        "axisAlpha": 1,
        "position": "left"
    }, {
        "id":"v2",
        "axisColor": "#2bb1ff",
        "axisThickness": 2,
        "axisAlpha": 1,
        "position": "right"
    }],
    "graphs": [{
        "valueAxis": "v1",
        "lineColor": "#ff2bd4",
        "bullet": "round",
        "bulletBorderThickness": 1,
        "hideBulletsCount": 30,
        "title": "Woman",
        "valueField": "visits",
        "fillAlphas": 0
    }, {
        "valueAxis": "v2",
        "lineColor": "#2bb1ff",
        "bullet": "square",
        "bulletBorderThickness": 1,
        "hideBulletsCount": 30,
        "title": "Man",
        "valueField": "hits",
        "fillAlphas": 0
    }],
    "chartScrollbar": {},
    "chartCursor": {
        "cursorPosition": "mouse"
    },
    "categoryField": "date",
    "categoryAxis": {
        "parseDates": true,
        "axisColor": "#DADADA",
        "minorGridEnabled": true
    },
    "export": {
        "enabled": true,
        "position": "bottom-right"
     }
});

chart.addListener("dataUpdated", zoomChart);
zoomChart();


// generate some random data, quite different range
function generateChartData(data) {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 100);

    for (var i = 0; i < data.length; i++) {
        var date = result[i].Edition;

        var visits = Math.round(Math.sin(i * 5) * i);
        var hits = Math.round(Math.random() * 80) + 500 + i * 3;
        var views = Math.round(Math.random() * 6000) + i * 4;

        chartData.push({
            date: newDate,
            visits: visits,
            hits: hits,
            views: views
        });
    }
    return chartData;
}

function zoomChart(){
    chart.zoomToIndexes(chart.dataProvider.length - 20, chart.dataProvider.length - 1);
}
