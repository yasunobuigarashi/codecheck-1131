'use strict';
var
    express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    parser = require('body-parser');

var knex = require('knex')({
	client: 'sqlite3';
	connection: {
	    filename ":memory:"
	}
    });

app.use(parser.json());
app.use(express.static(__dirname + '/public'))

    app.get('/api/ping', function (req, res, next) {
	    res.json('PONG');
	    return next();
	});

    app.get('/api/projects', function (req, res, next) {
	    knex.select('*').from('projects')
		.then(function(projects){
			res.json(projects);
			return next();
		    });
	    .catch(function(error){
		    res.status(500).json(error);
			return next();
		});

	    /**	    	    res.json('実装します');
			    return next(); */
	});


app.get('/api/notfound', function (req, res, next) {
	res.status(404).json('NotFound');
	return next();
    });

app.post('/api/badrequest', function (req, res, next) {
	res.status(400).json('BadRequest');
	return next();
    })

/**    app.listen(port, function () {
	    console.log('Server running with port', port);
	    }); */


/** @ToDo
 * Initialize database
 * this is for 'in-memory' database and should be removed
 */
var sqls = require('fs')
    .readFileSync(__dirname + '/specifications/database.sql')
    .toString();

knex.raw(sqls)
    .then(function () {
	    /** @ToDo
	     * Run server after database initialization
	     * this is for 'in-memory' database and should be removed
	     */
	    app.listen(port, function () {
		    console.log("Server running with port", port)
			});
	});

