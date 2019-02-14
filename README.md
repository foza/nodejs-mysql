# Nodejs MySQL
For installation
1) clone repo
```sh
$ cd project folder
$ npm install -d
$ npm install mysql 
$ npm install express 
$ npm install body-parser 
$ node index
```
 Open index.js and edit the database.
```sh
var mysqlConnection = mysql.createConnection({
	host:'',
	user:'',
	password: '',
	database: 'dev'
});
```
Small sample code for mysql + nodejs
