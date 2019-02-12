# Nodejs MySQL
For installation
1) clone repo
```sh
$ cd project folder
$ npm install -d
$ node index
```
 Open index.js and edit the database.
```sh
var mysqlConnection = mysql.createConnection({
	host:'localhost',
	user:'admin',
	password: '230230',
	database: 'dev'
});
```
Small sample code for mysql + nodejs
