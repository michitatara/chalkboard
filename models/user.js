const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
<<<<<<< HEAD
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "users" }
);

const model = mongoose.model("UserSchema", UserSchema);

// module.exports = model

module.exports = {
  fetchData: function (callback) {
    var userData = model.find({});
    userData.exec(function (err, data) {
      if (err) throw err;
      return callback(data);
    });
  },
};
=======
	{
        firstname: { type: String, required: true},
        lastname: { type: String, required: true},
		role: { type: String, required: true},
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true }
	},
	{ collection: 'users' }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model
>>>>>>> refs/remotes/origin/main
