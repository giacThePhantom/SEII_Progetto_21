//simple database like collection of data
const mongoose=require("mongoose")
const conn = require('../../Ensembl_communication/db_conn.js');
const models = require('../../Ensembl_communication/models.js');

//returns the entire collection of users
let users= async ()=>{
	let user = await models.users_model.find({});
	return user;
}
//checks wether the specified user alreasy exists inside the database
//used inside the insert_user function to avoid having duplicates inside the database
async function user_already_saved(model, user_info){
	let data = await model.find({'email': user_info.email});
	let res;
	if(data.length > 0){//if an account with the same email is inside the database the request won't be accepted
		res = true;
	}
	else{
		res = false;
	}
	//console.log("res: "+res);
	return res;

}

module.exports = {
    users:users,
		insert_user:async(user_info)=>{
			user_info.id=await models.users_model.find({}).count();
			user_info.admin=false;
			console.log(user_info);
			let to_be_saved = !(await user_already_saved(models.users_model, user_info));
			if(to_be_saved){
				let to_be_inserted = new models.users_model(user_info);
				await to_be_inserted.save((err) => {console.log(err, 'Inserted correctly', 'Inserted user info');});
			}
			return to_be_saved;

		},
		delete_user:async(id)=>{
			let data = await models.users_model.deleteOne({'id': id});
			return data;
		},
		authenticate: async (email,password)=>{
			let user= await models.users_model.findOne({email:email, password:password});
			let userinfo={
				username:user.username,
				email:user.email,
				admin: user.admin,
				self: "/api/v1/users/"+user.id
			}
			return userinfo;
		},
		get_userbyID:async(id)=>{
			let user = await models.users_model.findOne({'id': id});
			if(user){
				var userinfo={
					username:user.username,
					email:user.email,
					admin: user.admin,
					self: "/api/v1/users/"+user.id
				}
			}
			else{
				var userinfo=null;
			}
				return userinfo;
		}
};
