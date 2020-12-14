const fetch = require("node-fetch");
const url = "https://se-2-progetto-21.herokuapp.com/api/v2/users"


describe('login.test', () => {
		it("get user list",()=>{
			expect.assertions(1);
			return fetch(url)
					.then(r => r.json())
					.then( data => {
						expect({email:data[0]["email"],id:data[0]["id"]}).toEqual( {email:"nicola.marchioro@studenti.unitn.it",id:"0"})
					} )
		});
		it("get user by id and correct token",()=>{
			expect.assertions(1);

			return fetch(url+'/0?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY29sYS5tYXJjaGlvcm9Ac3R1ZGVudGkudW5pdG4uaXQiLCJpZCI6IjAiLCJpYXQiOjE2MDc5ODI0MjgsImV4cCI6MjAwMDc5ODYwMjh9.qzfaT6LGH0ZVbFtMzEvIkXXvSHuSD8cVlTm6S89BTGM')
					.then(r => r.json())
					.then( data => {
							expect(data).toEqual({email: "nicola.marchioro@studenti.unitn.it",
								username:"NicolaMarchioro1",
								self: "/api/v2/users/0",
								admin:false,
							history:[]})
					} )
		});


		it("get user by wrong id and correct token",()=>{
			expect.assertions(1);
				return fetch(url+'/-1?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pY29sYS5tYXJjaGlvcm9Ac3R1ZGVudGkudW5pdG4uaXQiLCJpZCI6IjAiLCJpYXQiOjE2MDc5ODI0MjgsImV4cCI6MjAwMDc5ODYwMjh9.qzfaT6LGH0ZVbFtMzEvIkXXvSHuSD8cVlTm6S89BTGM')
									.then(r => r.json())
									.then( data => {
										expect(data).toEqual({"message":"user not found"})
										})
		});

				it("get user by id and wrong token",()=>{
					expect.assertions(1);
						return fetch(url+'/0?token=wrong_token')
											.then(r => r.json())
											.then( data => {
												expect(data).toEqual({message:"Failed to authenticate token.", success: false})
												})
				});

				it("create user with already registered email", async ()=>{

					expect.assertions(1);
					return fetch(url,
							{
							 method: 'POST',
							 body: JSON.stringify({email: "nicola.marchioro@studenti.unitn.it",password:"admin",username:"Nicola"}),
							 headers: {
							 'Content-Type': 'application/json'
						 }
						 })	.then(r => r.json())
							 .then( data => {
						expect(data).toEqual( {error: "This email is already in our database"});
						})
				});


				it("create user with already registered email", async ()=>{

						expect.assertions(1);
					return fetch(url,
							{
							 method: 'POST',
								 body: JSON.stringify({email: "testemail@email.unitn.it",password:"test",username:"Test"}),
							 headers: {
							 'Content-Type': 'application/json'
						 }
						 })	.then(r => r.json())
							 .then( data => {
						expect(data).toEqual( {ok:"User correctly registered"});
						})
				});
		it("authenticate user", async ()=>{
			expect.assertions(1);

			return fetch(url+"/auth",
					{
					 method: 'POST',
					 body: JSON.stringify({email: "testemail@email.unitn.it",password:"test"}),
					 headers: {
					 'Content-Type': 'application/json'
				 }
			 }).then((res)=>{	expect(res.status).toEqual(200)});

		});
		it("delete user", async ()=>{
		expect.assertions(1);

		return fetch(url,
			{
			 method: 'DELETE',
			 body: JSON.stringify({id: "1",token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlbWFpbEBlbWFpbC51bml0bi5pdCIsImlkIjoiMSIsImlhdCI6MTYwNzk4NTY2MSwiZXhwIjoxNjA3OTg5MjYxfQ.8z7kB_E2xPGLVtYzt_Vbs_wMzfUspGh8iD66a_VU3RI"}),
			 headers: {
			 'Content-Type': 'application/json'
		 }
	 }).then((res)=>{	expect(res.status).toEqual(201)});
 });
});
