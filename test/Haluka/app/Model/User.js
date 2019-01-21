/**
 * @name User
 * @author Robin Panta <hacktivistic@gmail.com>
 */
'use strict'

// Imports & Declarations
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// Schema
var UserSchema = new Schema({
	username:{
		type:String,
		unique: true,
		required:true
	},
	profilePic: {
	    data: Buffer,
	    contentType: String
	},
	name : {
		type: String,
		required: true
	},
	rememberToken : {
		type: Boolean,
		default: false
	},
	status : {
		type: Number,
		default: 1
	}
},  {
	timestamps: true
});

UserSchema.plugin(passportLocalMongoose);

var User = use('Database').default().model('User', UserSchema);
module.exports = User
