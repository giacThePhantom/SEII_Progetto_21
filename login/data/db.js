//simple database like collection of data

const storage = {
    users: []
};



const users = {
    insert(user) {
        let ids = storage.users.map(a => a.id);
        user.id = ( storage.users.length==0 ? 1 : Math.max(...ids) + 1);
        storage.users.push(user);
        return user.id;
    },
    findById(id) {
        return storage.users.find(x => x.id == id);
    },
    all() {
        return storage.users;
    }
};



users.insert({
    email: "admin@unitn.com",
		username:"admin",
		password: "admin",
		admin:true
});
users.insert({
    email: "nicola@unitn.com",
		username:"nicola",
		password: "nicola",
		admin:false
});




module.exports = {
    users
};
