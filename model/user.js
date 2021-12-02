const mongoose= require('mongoose')

const Userschema= new mongoose.Schema({

   firstname:{type:String, required: true},
    lastname:{type:String, required: true},
    email:{type:String, required: true, unique: true},
    password:{type:String, required: true}

},
{collection:'user'}
)


const model= mongoose.model('UserSchema', Userschema)

module.exports= model