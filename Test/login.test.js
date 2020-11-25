const app = require("../login/login_core.js");
const fetch = require("node-fetch");
const url = "http://localhost:3000/api/v1/users"


describe('login.test', () => {

    let server;

    beforeAll( () => {
        const port = process.env.PORT || 3000;

        // Promisifying app.listen and return promise,
        // letting Jest wait for its resolution before starting tests.
        // https://github.com/nodejs/node/issues/21482
        // https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Promise
        return new Promise( (resolve, reject) => {
            server = app.listen(port, resolve());
            console.log(`Server listening on port ${port}`);
        });

    });

    afterAll( (done) => {
        // Notifying Jest by calling done() in the callback of the close method.
        // No promise used here.
        // https://github.com/visionmedia/supertest/issues/520
        console.log(`Closing server`);
        server.close( );
				done();
    });
		it("get user",()=>{
			expect.assertions(1);

			return fetch(url)
					.then(r => r.json())
					.then( data => {
							expect(data[0]).toEqual({  email: "admin@unitn.com",
								username:"admin",
								self: "/api/v1/users/1",
								admin:true})
					} )
		});


});
