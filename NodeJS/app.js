var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var port = 3000;

var do_query = require('./routes/do_query');
var get_options = require('./routes/get_options');

var app = express();

app.set('views', __dirname+'/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function(req, res) {
	res.render('index');
	console.log('index');
});


app.post('/get_discipline_options.do', function(req, res) {
	console.log('get discipline options');
	get_options.discipline_options(req, res);
});
app.post('/get_event_options.do', function(req, res) {
	console.log('get event options');
	get_options.event_options(req, res);
});
app.post('/get_edition_options.do', function(req, res) {
	console.log('get edition options');
	get_options.edition_options(req, res);
});

app.post('/requery.do', function(req, res) {
	console.log("----requery----");
	do_query.query(req, res);
});

app.post('/query_chart.do', function(req, res) {
	console.log("----query chart data----");
	do_query.query_chart(req, res);
})

app.get('/query', function(req, res) {
	res.render('result', {
		dis_selected: req.query.dis_selected,
		eve_selected: req.query.eve_selected,
		edi_selected: req.query.edi_selected,
	})
});


app.get('/q3', function(req, res) {
	res.render('q3');
	console.log('q3');
});
app.get('/q4', function(req, res) {
	res.render('q4');
	console.log('q4');
});



app.listen(port, function(err) {
	if (err){
		return console.log(err);
	}
	console.log('Server listenning on port '+port);
});