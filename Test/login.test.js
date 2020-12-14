const fetch = require("node-fetch");
const url = "https://se-2-progetto-21.herokuapp.com/api/v2/users"


describe('login.test', () => {
		it("get user list",()=>{
			expect.assertions(1);

			return fetch(url)
					.then(r => r.json())
					.then( data => {
							expect(data[0]).toEqual({email: "admin@unitn.com",
								username:"admin",
								self: "/api/v2/users/1",
								admin:true})
					} )
		});
		it("get user by id",()=>{
			expect.assertions(1);

			return fetch(url+"/1")
					.then(r => r.json())
					.then( data => {
							expect(data).toEqual([{  email: "admin@unitn.com",
								username:"admin",
								self: "/api/v2/users/1",
								admin:true}])
					} )
		});

    it("get user by id",()=>{
      expect.assertions(1);
        return fetch(url+"/-1")
                  .then(r => r.json())
                  .then( data => {
                    expect(data).toEqual([])
                    })
    });

		it("authenticate user", async ()=>{
			expect.assertions(1);

			var response= fetch(url+"/auth",
					{
					 method: 'POST',
					 body: JSON.stringify({email: 'admin@unitn.com',password:"admin"}),
					 headers: {
					 'Content-Type': 'application/json'
				 }
				 })
				 var json = await response;
				expect(json.status).toEqual(200);

		});
});
