var dao = require("./DAO")

exports.discipline_options = function(req, res) {
	var eve = req.body.eventSelected;
	var edi = req.body.editionSelected;
	var queryString = "Select distinct dname From event_of where 1=1";
	if (eve != "All Events") {
		queryString = queryString + " and ename = '" + eve + "'";
	}
	if (edi != "All Editions") {
		queryString = queryString + " and edition = '" + edi + "'";
	}
	queryString = queryString + " order by dname";

	dao.query(queryString, function(result) {
		res.send(JSON.stringify(result));
	});
}

exports.event_options = function(req, res) {
	var dis = req.body.disciplineSelected;
	var edi = req.body.editionSelected;
	var queryString = "Select distinct ename From event_of where 1=1";
	if (dis != "All Disciplines") {
		queryString = queryString + " and dname = '" + dis + "'";
	}
	if (edi != "All Editions") {
		queryString = queryString + " and edition = '" + edi + "'";
	}
	queryString = queryString + " order by ename";

	dao.query(queryString, function(result) {
		res.send(JSON.stringify(result));
	});
}

exports.edition_options = function(req, res) {
	var dis = req.body.disciplineSelected;
	var eve = req.body.eventSelected;
	var pop = req.body.numberOverPopulation;

	var queryString = "Select distinct edition From event_of where 1=1";
	if (eve != "All Events") {
		queryString = queryString + " and ename = '" + eve + "'";
	}
	if (dis != "All Disciplines") {
		queryString = queryString + " and dname = '" + dis + "'";
	}
	queryString = queryString + " order by edition";


	dao.query(queryString, function(result) {
		res.send(JSON.stringify(result));
	});
}