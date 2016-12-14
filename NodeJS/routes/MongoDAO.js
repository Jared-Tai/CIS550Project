var mongodb = require('mongodb');

var uri = 'mongodb://cis550project:cis550project@ds127968.mlab.com:27968/cis550project';

exports.query_records = function(eName, dName, callback) {
  
  mongodb.MongoClient.connect(uri, function(err, db) {
  
	if(err) throw err;

	var Records = db.collection('Records');
	console.log("connect successfully")
	
	Records.find({"EName": eName, "DName": dName, "Medal": "Gold"}).sort({"Edition": 1, "Gender": 1})
	.toArray(function(err, result) {
	if (err) console.log(err);
	console.log(result);
	callback(result);

	});

  });

}