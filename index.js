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

mysqlConnection.connect((err)=>{
	if (!err)
		console.log('Есть подключение');
	else
		console.log('Ошибка при подключение error: \n ' +JSON.stringify(err, undefined, 2));
});

app.listen(3000,()=>console.log('server start'));

app.get('/orders',(req,res)=>{
	mysqlConnection.query('SELECT `id`, `order_code`, `status_id`, `created` FROM `OrderOld`',(err, rows, fields)=>{
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