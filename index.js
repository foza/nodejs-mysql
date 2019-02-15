const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.json());


var mysqlConnection = mysql.createConnection({
	host:'localhost',
	user:'admin',
	password: '230230',
	database: 'dev'
});

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
};
app.use(allowCrossDomain);

mysqlConnection.connect((err)=>{
	if (!err)
		console.log('Есть подключение');
	else
		console.log('Ошибка при подключение error: \n ' +JSON.stringify(err, undefined, 2));
});

app.listen(3001,()=>console.log('server start'));

app.get('/list',(req,res)=>{
	mysqlConnection.query('SELECT `id`, `name`, `phone` FROM `OrderCourier` ',(err, rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	})
});

app.get('/orders/:id',(req,res)=>{
	mysqlConnection.query('SELECT `id`, `order_code`, `status_id`, `created` FROM `OrderOld` WHERE status_id = ?',[req.params.id],(err, rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	})
});

app.get('/courier/:id',(req,res)=>{
	mysqlConnection.query('SELECT * FROM `OrderCourier` INNER JOIN `BillingHistory` on `OrderCourier`.id = `BillingHistory`.user_id WHERE `OrderCourier`.id = ?',[req.params.id],(err, rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	})
});
