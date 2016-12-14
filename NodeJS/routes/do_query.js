var dao = require("./DAO");
var mongoDao = require("./MongoDAO");

exports.query = function(req, res) {
	var dis_selected = req.body.disciplineSelected;
	var eve_selected = req.body.eventSelected;
	var edi_selected = req.body.editionSelected;
	var display_year = req.body.displayByYear;
	var num_population = req.body.numberOverPopulation;

	console.log("get request : "+dis_selected+" ; "+eve_selected+" ; "+edi_selected+
		" ; "+display_year+" ; "+num_population);

	if (display_year == "true") {
		year_sum(res, dis_selected, eve_selected);
	}
	else {
		if (num_population == "true") {
			country_avg(res, dis_selected, eve_selected, edi_selected);
		}
		else {
			country_sum(res, dis_selected, eve_selected, edi_selected);
		}
	}



}

function country_sum(res, dis_selected, eve_selected, edi_selected) {
	//Country as first column and return total number of medals
	var queryString = 
	"with Medals as (select A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal, count(distinct A.Medal) as MedalNum\n" +
	"from Nation N left Join Attend A on N.IOC = A.IOC\n" +
	"group by A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal)\n" +
	
	"select N.NName, N.IOC, count(M.MedalNum)\n" +
	"from Nation N left join Medals M on N.IOC = M.IOC\n" + 
	"where 1 = 1 ";

	if (edi_selected != "All Editions"){
		queryString += "and M.Edition = "+edi_selected+" "
	}
	if (dis_selected != "All Disciplines"){
		queryString += "and M.DName = '"+dis_selected+"' ";
	}
	if (eve_selected != "All Events"){
		queryString += "and M.EName = '"+eve_selected+"' ";
	}
	queryString += 
	"\ngroup by N.NName, N.IOC\n" + 
	"order by count(M.MedalNum) desc, N.NName, N.IOC";

	console.log(queryString);

	dao.query(queryString, function(results) {
		if (results.rows.length == 0) {
			res.send(JSON.parse('{"fail":"No record found"}'));
			return;
		}
		resString = '{"fail":"success",';
		resString += '"headers":["Country","IOC","Number of Medals"], "data":[';
		resString += '{"c1":"'+results.rows[0][0]+
		'","c2":"'+results.rows[0][1]+'","c3":"'+results.rows[0][2]+'"}';
		for (i = 1; i < results.rows.length; i++) {
			resString += ',{"c1":"'+results.rows[i][0]+
			'","c2":"'+results.rows[i][1]+'","c3":"'+results.rows[i][2]+'"}';
		}
		resString += ']}';
		console.log(JSON.parse(resString));
		res.send(JSON.parse(resString));
	});
	
}

function country_avg(res, dis_selected, eve_selected, edi_selected) {
	//Country as first column and return number of medals over population
	if (edi_selected == "All Editions") {
		res.send(JSON.parse('{"fail":"For number of medals over population, you'+
			'have to select a specific edition"}'));
		return;
	}
	var queryString = 
	"with Medals as (select A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal, count(distinct A.Medal) as MedalNum\n" +
	  "from Nation N left Join Attend A on N.IOC = A.IOC\n" +
	"group by A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal)\n" +
	"select N.NName, N.IOC, count(M.Medal), NP.Population\n" + 
	"from Nation N left join Medals M on N.IOC = M.IOC\n"  +
	"inner join Nation_Owns_Population NP\n" +
	"on NP.IOC = M.IOC and NP.Year = M.Edition\n" + 
	"where NP.Year = " + edi_selected + "\n";

	if (dis_selected != "All Disciplines"){
		queryString += "and M.DName = '"+dis_selected+"' ";
	}
	if (eve_selected != "All Events"){
		queryString += "and M.EName = '"+eve_selected+"' ";
	}
					  
	queryString += 
	"group by N.NName, N.IOC, NP.Population\n" +
	"order by count(M.Medal) desc, N.NName, N.IOC"

	console.log(queryString);
	dao.query(queryString, function(results) {
		console.log(results);
		if (results.rows.length == 0) {
			res.send(JSON.parse('{"fail":"No record found"}'));
			return;
		}
		resString = '{"fail":"success",';
		resString += '"headers":["Country","IOC","#Medal per million population"], "data":[';
		resString += '{"c1":"'+results.rows[0][0]+
		'","c2":"'+results.rows[0][1]+'","c3":"'+
		Math.round(parseInt(results.rows[0][2])/parseInt(results.rows[0][3])*10000000)/10000+'"}';
		for (i = 1; i < results.rows.length; i++) {
			resString += ',{"c1":"'+results.rows[i][0]+
			'","c2":"'+results.rows[i][1]+'","c3":"'+
			Math.round(parseInt(results.rows[i][2])/parseInt(results.rows[i][3])*10000000)/10000+'"}';
		}
		resString += ']}';
		console.log(JSON.parse(resString));
		res.send(JSON.parse(resString));
	});
}

function year_sum(res, dis_selected, eve_selected) {
	var queryString = ""
	queryString += "With Medals as (select A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal, count(distinct A.Medal) as MedalNum"+
	" from Nation N inner Join Attend A on N.IOC = A.IOC"+
	" group by A.Edition, N.NName, N.IOC, A.EName, A.DName, A.Gender, A.Medal)"+
	" select edition, count(MedalNum)"+
	" from Medals"+
	" where 1=1 ";
	if (dis_selected != "All Disciplines"){
		queryString += "and DName = '"+dis_selected+"' ";
	}
	if (eve_selected != "All Events"){
		queryString += "and EName = '"+eve_selected+"' ";
	}
	queryString += "group by edition order by edition desc"

	dao.query(queryString, function(results) {
		if (results.rows.length == 0) {
			res.send(JSON.parse('{"fail":"No record found"}'));
			return;
		}
		resString = '{"fail":"success",';
		resString += '"headers":["Year","Number of Medals"], "data":[';
		resString += '{"c1":"'+results.rows[0][0]+
		'","c2":"'+results.rows[0][1]+'"}';
		for (i = 1; i < results.rows.length; i++) {
			resString += ',{"c1":"'+results.rows[i][0]+
			'","c2":"'+results.rows[i][1]+'"}';
		}
		resString += ']}';
		console.log(JSON.parse(resString));
		res.send(JSON.parse(resString));
	});
}

exports.query_chart = function (req, res){
	var dis_selected = req.body.disciplineSelected;
	var eve_selected = req.body.eventSelected;
	console.log("query data : "+dis_selected+", "+eve_selected);
	mongoDao.query_records(eve_selected, dis_selected, function(result) {
		res.send(result);
	});
}