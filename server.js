var express = require('express');
const ejs = require('ejs');
var app = express ();
app.use('/', express.static(path.join(_dirname, 'static')))

app.use(express.static('public'));
app.set('view engine', 'ejs');
const path = require('path');
const PORT = process.env.PORT || 3306;
app.use(express.static('src'));
app.listen(3306, () => {
    console.log(`App listening on port ${PORT}`);
})

app.get('/', function (req,res){
    res.render('src/index');
});