var current_discipline;
var current_event;
var current_edition;

init();
diOptions();
evOptions();
edOptions();

function init() {
  current_discipline = $("#select-discipline option:selected").text();
  current_event = $("#select-event option:selected").text();
  current_edition = $("#select-edition option:selected").text();
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
}

function evSelected() {
  init();
  diOptions();
  edOptions();
}

function edSelected() {
  init();
  evOptions();
  diOptions();
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
    timeout: 5000,
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
    timeout: 5000,
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
    timeout: 5000,
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
