const express = require('express')
const path=require('path')
const mongoose=require('mongoose')
const User= require('./models/user')
const ejs = require('ejs')
const port = 3000
const app = express()

mongoose.connect('mongodb://localhost:27017/login-app-db', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('signup');
});

app.post('/api/register', async(req, res)=> {
   console.log(req.body)
    res.json({status:'ok'})
})

app.listen(port, () =>{
    console.log(`Server up at ${port}`) 
})
