const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
// app.use(bodyparser());

app.use(bodyparser.json({ type: 'application/json' }));
app.use(bodyparser.urlencoded({
  extended: true
}));
var mysqlConnection = mysql.createConnection({
	host:'localhost',
	user:'admin',
	password: '230230',
	database: 'dev'
});

app.use(async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


mysqlConnection.connect((err)=>{
	if (!err)
		console.log('Есть подключение');
	else
		console.log('Ошибка при подключение error: \n ' +JSON.stringify(err, undefined, 2));
});

app.listen(3001,()=>console.log('server start'));

app.get('/list',(req,res)=>{
	mysqlConnection.query('SELECT `id`, `name`, `phone` FROM `OrderCourier`',(err, rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	})
});

app.get('/detail/:id',(req,res)=>{
	mysqlConnection.query('SELECT `id`, `order_code`, `status_id`, `balance`, `created` FROM `OrderOld` WHERE status_id = ?',[req.params.id],(err, rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	})
});

app.get('/sum/:id',(req,res)=>{
	mysqlConnection.query('SELECT user_id, SUM(balance) AS user_sum  FROM `BillingHistory` WHERE user_id = ? GROUP BY user_id',[req.params.id],(err, rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	})
});

app.get('/courierDetail/:id',(req,res)=>{
	mysqlConnection.query('SELECT * FROM `OrderCourier` INNER JOIN `BillingHistory` on `OrderCourier`.id = `BillingHistory`.user_id WHERE `OrderCourier`.id = ?',[req.params.id],(err, rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	})
});


app.post('/add',(req,res)=>{

	res.end(JSON.stringify(req.body));
	console.log(req.body);

});

