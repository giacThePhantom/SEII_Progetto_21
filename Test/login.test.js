const fetch = require("node-fetch");
const url = "https://se-2-progetto-21.herokuapp.com/api/v2/users"


describe('login.test', () => {
		it("get user list",()=>{
			expect.assertions(1);

			return fetch(url)
					.then(r => r.json())
					.then( data => {
							expect(data[0]).toEqual({email: "nicola.marchioro@studenti.unitn.com",
								username:"NicolaMarchioro1",
								self: "/api/v2/users/0",
								admin:false})
					} )
		});
		it("get user by id",()=>{
			expect.assertions(1);

			return fetch(url+"/0")
					.then(r => r.json())
					.then( data => {
							expect(data).toContain([{email: "nicola.marchioro@studenti.unitn.com",
								username:"NicolaMarchioro1",
								id: "0",
								admin:false}])
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
					 body: JSON.stringify({email: "nicola.marchioro@studenti.unitn.com",password:"admin"}),
					 headers: {
					 'Content-Type': 'application/json'
				 }
				 })
				 var json = await response;
				expect(json.status).toEqual(200);

		});
});
