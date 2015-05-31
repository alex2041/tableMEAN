var express = require('express');
var mongojs = require('mongojs');
var db = mongojs("dbt", ["serviceClients"]);

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());


// дата
app.get("/serviceClients", function(req, res){
	db.serviceClients.find(function(err, docs){
		res.json(docs);
	});
});

// поиск отдельного элемента в базе
app.get("/serviceClients/:id", function(req, res){
	
	var id = req.params["id"];
	console.log(id);
	db.serviceClients.findOne({_id : mongojs.ObjectId(id)}, function(err, doc){
	 	res.json(doc);
	});

});

// обработка запроса на добавление
app.post("/serviceClients", function(req, res){
	var svc = req.body;
	console.log(svc);

	db.serviceClients.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

// обработка запросов для редактирования
app.put("/serviceClients/:id", function(req, res){
	console.log(req.body);
	var id = req.params["id"];

	db.serviceClients.findAndModify(
	{
	    query: {_id : mongojs.ObjectId(id)},
	    update: {$set : {name : req.body.name}}
	},
		function(err, doc){
			res.json(doc);
		}
	);
	
});

// обрабатываем запрос на удаление
app.delete("/serviceClients/:id", function(req, res){
	var id = req.params["id"];
	console.log(id);
	db.serviceClients.remove({_id : mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.listen(80);