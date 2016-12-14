var oracledb = require('oracledb');

exports.query = function(queryString, callback){

	oracledb.getConnection({
		user: "CIS550Project",
		password: "CIS550Project",
		connectString: "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=cis550group21db.c56jamskv0nb.us-west-2.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SID=ORCL)))"
	}, function(err, connection) {
		if (err) {
			console.error(err.message);
			return;
		}
		console.log("\nQuery : "+queryString);
		connection.execute(queryString, [],{ maxRows: 1000 },
		function(err, result) {
			if (err) {
				console.error(err.message);
				doRelease(connection);
				return;
			}
			callback(result);
			doRelease(connection);
		});
	});
}

function doRelease(connection) {
	connection.release(
		function(err) {
			if (err) {console.error(err.message);}
		}
	);
}