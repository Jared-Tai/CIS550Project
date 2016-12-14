var current_discipline;
var current_event;
var current_edition;
var chart;

init();
diOptions();
evOptions();
edOptions();
query_result();


$('#switch1').change(function() {
  if ($(this).is(':checked')) {
    //Years as first column
    $('#label1').html("Years as first column");
    document.getElementById('toggle2').style.display = "none";
    document.getElementById('select-edition').style.display = "none";
  }
  else {
    //Country
    $('#label1').html("Country as first column");
    document.getElementById('toggle2').style.display = "block";
    document.getElementById('select-edition').style.display = "block";
    document.getElementById('chart-view').style.display = "none";
  }

  query_result();

});

$('#switch2').change(function() {
  if ($(this).is(':checked')) {
    //per head
    $('#label2').html("Number of medals over population");
  }
  else {
    //total
    $('#label2').html("Total number of medals");
  }

  query_result();

});

function init() {
  current_discipline = $("#select-discipline option:selected").text();
  current_event = $("#select-event option:selected").text();
  current_edition = $("#select-edition option:selected").text();
  document.getElementById("result-table").style.display = "none";

}

function startLoading() {
  document.getElementById("loader").style.display = "block";
  document.getElementById("dim").style.display = "block";
}

function finishLoading() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("dim").style.display = "none";

}

function diSelected() {
  init();
  evOptions();
  edOptions();
  query_result();
}

function evSelected() {
  init();
  diOptions();
  edOptions();
  query_result();
}

function edSelected() {
  init();
  evOptions();
  diOptions();
  query_result();
}

function diOptions() {
  //get discipline options from server
  var param = {
      eventSelected: current_event,
      editionSelected: current_edition
  };

  $.ajax({
    beforeSend: startLoading(),
    type: "POST",
    dataType:"json",
    url: "get_discipline_options.do",
    async: true,
    data: param,
    timeout: 15000,
    success: function(data) {
      options = data.rows;
      $("#select-discipline").empty();
      $('#select-discipline').append('<option>All Disciplines</option>');
      for (i in options) {
        $('#select-discipline').append('<option>'+options[i]+'</option>');
      }
      $('#select-discipline').val(current_discipline);
      finishLoading();
    }
  });


}

function evOptions() {
  //get options from server
  param = {
      disciplineSelected: current_discipline,
      editionSelected: current_edition
  };

  $.ajax({
    beforeSend: startLoading(),
    type: "POST",
    dataType:"json",
    url: "get_event_options.do",
    async: true,
    data: param,
    timeout: 15000,
    success: function(data) {
      options = data.rows;
      $("#select-event").empty();
      $('#select-event').append('<option>All Events</option>');
      for (i in options) {
        $('#select-event').append('<option>'+options[i]+'</option>');
      }
      $('#select-event').val(current_event);
      finishLoading();
    }
  });


}

function edOptions() {
  //get options from server
  param = {
      disciplineSelected: current_discipline,
      eventSelected: current_event,
  }
  
  $.ajax({
    beforeSend: startLoading(),
    type: "POST",
    dataType:"json",
    url: "get_edition_options.do",
    async: true,
    data: param,
    timeout: 15000,
    success: function(data) {
      options = data.rows;
      $("#select-edition").empty();
      $('#select-edition').append('<option>All Editions</option>');
      for (i in options) {
        $('#select-edition').append('<option>'+options[i]+'</option>');
      }
      $('#select-edition').val(current_edition);
      finishLoading();
    }
  });

}


function query_result() {
  init();
  var options;
  var param = {
      disciplineSelected: current_discipline,
      eventSelected: current_event,
      editionSelected: current_edition,
      displayByYear: $('#switch1').is(':checked'),
      numberOverPopulation: $('#switch2').is(':checked'),
  };

  $.ajax({
    beforeSend: startLoading(),
    type: "POST",
    dataType:"json",
    url: "requery.do",
    async: true,
    data: param,
    timeout: 15000,
    success: function(results) {
      //TODO: update table
      update_table(results);
      finishLoading();
    }
  });

  showChart();
}

function update_table(data) {
  if (data.fail == "success") {
    header = data.headers;
    tbody = data.data;

    document.getElementById("warning").style.display = "none";
    document.getElementById("recnum").style.display = "block";
    if ($('#switch1').is(':checked')) {
      $('#restitle').html(current_discipline+" - "+current_event+" in All Editions")
    }
    $('#restitle').html(current_discipline+" - "+current_event+" in "+current_edition)
    $('#recnum').html(tbody.length+" records found")
    
    //update teh header
    headerString = "";
    for (i in header) {
      headerString += "<th>"+header[i]+"</th>";
    }
    $('#table-header').html("<tr>"+headerString+"</tr>");

    //update the data
    bodyString = "";
    for (i in tbody) {
      bodyString += "<tr>";
      for (j in tbody[i]) {
        bodyString += "<td>"+tbody[i][j]+"</td>";
        
      }
      bodyString += "</tr>";
    }
    $('#table-body').html(bodyString);

    document.getElementById("result-table").style.display = "block";
    
  } else {
    document.getElementById("result-table").style.display = "none";
    document.getElementById("recnum").style.display = "none";
    $('#warning').html(data.fail);
    document.getElementById("warning").style.display = "block";
  }

}

function showChart() {
  if ($('#switch1').is(':checked')){
    var dis = $("#select-discipline option:selected").text();
    var eve = $("#select-event option:selected").text();
    var param = {
      disciplineSelected: current_discipline,
      eventSelected: current_event
    };

    $.ajax({
      beforeSend: startLoading(),
      type: "POST",
      dataType:"json",
      url: "query_chart.do",
      async: true,
      data: param,
      timeout: 15000,
      success: function(results) {
        //TODO: update table
        update_chart(results);
        finishLoading();
      }
    });
  }
}

function update_chart(result) {
  if (result.length != 0) {
    //has data
    document.getElementById("chart-view").style.display = "block";
    var chartData = generateChartData(result);

    chart = AmCharts.makeChart("chart-view",
    {
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
            "duration": "ss",
            "position": "left"
        }, {
            "id":"v2",
            "axisColor": "#2bb1ff",
            "axisThickness": 2,
            "axisAlpha": 1,
            "duration": "ss",
            "position": "right"
        }],
        "graphs": [{
            "valueAxis": "v1",
            "lineColor": "#ff2bd4",
            "numberFormatter": {
              precision:2,decimalSeparator:".",thousandsSeparator:""
            },
            "bullet": "round",
            "bulletBorderThickness": 1,
            "balloonText": "Athlete: [[wname]]\nRecords: [[women]]",
            "hideBulletsCount": 30,
            "title": "Woman",
            "valueField": "women",
            "fillAlphas": 0
        }, {
            "valueAxis": "v2",
            "lineColor": "#2bb1ff",
            "numberFormatter": {
              precision:2,decimalSeparator:".",thousandsSeparator:""
            },
            "bullet": "square",
            "bulletBorderThickness": 1,
            "balloonText": "Athlete: [[mname]]\nRecords: [[men]]",
            "hideBulletsCount": 30,
            "title": "Men",
            "valueField": "men",
            "fillAlphas": 0
        }],
        "chartScrollbar": {},
        "chartCursor": {
            "categoryBalloonDateFormat": "YYYY",
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

  }
  else {
    document.getElementById("chart-view").style.display = "none";
  }
}
    
function generateChartData(data) {
  var chartData = [];
  var years = new Set();
  var m_men;
  var m_women;
  var men_name;
  var women_name;

  for (var i = 0; i < data.length; i++) {
    var m_date = data[i].Edition + ".8";

    if (data[i].Gender == "Men") {
      m_men = data[i].Athlete.Record;
      m_men = parseSecond(m_men);
      men_name = data[i].Athlete.AName;
    }
    else {
      m_women = data[i].Athlete.Record;
      m_women = parseSecond(m_women);
      women_name = data[i].Athlete.AName;
    }

    if (years.has(m_date)) {
      //alert(m_date+" appears already!");
      chartData.pop();
      //alert("popping");
      chartData.push({
        date: m_date,
        men: m_men,
        women: m_women,
        mname: men_name,
        wname: women_name
      });
      //alert(chartData[i].women = m_women);

    }
    else {
      years.add(m_date);
      chartData.push({
        date: m_date,
        men: m_men,
        women: m_women,
        mname: men_name,
        wname: women_name
      });
    }


  }
  return chartData;
}

function parseSecond(time) {
  parts = time.split(":");
  if (parts.length == 1) {
    return parseFloat(parts[0].replace(",", "."));
  }

  sec = parseFloat(parts[1].replace(",", "."));
  sec += parseFloat(parts[0]) * 60;
  return sec;
}