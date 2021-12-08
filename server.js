const express = require('express')
const path=require('path')
const mongoose=require('mongoose')
const User= require('./models/user')
const ejs = require('ejs')
const port = process.env.PORT || 3000;
const app = express()
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost:27017/login-app-db', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.render(path.join( __dirname ,'/views','signup'));
})

const publicDirectoryPath = path.join(__dirname, '/views');
const staticDirectory =  express.static(publicDirectoryPath);
app.use(staticDirectory);


app.post('/api/register', async (req, res) => {
	const { firstname, lastname, email, password: plainTextPassword } = req.body

    if (!firstname || typeof firstname !== 'string') {
		return res.json({ status: 'error', error: 'valid username' })
	}
    if (!lastname || typeof lastname !== 'string') {
		return res.json({ status: 'error', error: 'valid username' })
	}

	if (!email || typeof email !== 'string') {
		return res.json({ status: 'error', error: 'Invalid email' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
            firstname,
            lastname,
			email,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})




app.listen(port, () =>{
    console.log(`Server up at ${port}`) 
})
