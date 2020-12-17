const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const app = express();

// const mysql = require('mysql');
const connection = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   database:'crud',    
});

connection.connect(function(error){
   if(!!error) console.log(error);
   else console.log('Database Connected!');
});

//set views file
app.set('views', path.join(__dirname, 'views'));

//set view engine
app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false}));


app.get('/', (req, res) => {
    let sql = "SELECT * FROM users";
    
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('user_index',{
            title : ' CRUD Operation using NodeJS / ExpressJS / MySQL ',
            users : rows
       });
       
       
        });
});


app.listen(3000, () => {
    console.log('server is running at port 3000');
});
