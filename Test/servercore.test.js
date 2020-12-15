const app = require("../servercore/app");
const fetch = require("node-fetch");
const url = "http://localhost:3000/api/v2/species"


describe('servercore.test', () => {

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
        console.log('Closing server');
        server.close( );
				done();
    });
    //testa GET singolo gene
		it("get json",()=>{
			expect.assertions(1);
			return fetch(url+"/rat/ENSRNOG00000000001")
					.then(r => r.json())
					.then( data => {
							expect(data).toEqual({"id":"ENSRNOG00000000001","version":5,"start":230660664,"end":230662084,"biotype":"pseudogene","chromosome":"2","strand":1,"name":"ensembl"})
					} )
		});

        it("get ok status", async()=>{
			expect.assertions(1);
            let resp = await fetch (url+"/chicken")
					expect(resp.status).toEqual(200);
        });
        
        it("get not found status", async()=>{
			expect.assertions(1);
            let resp = await fetch (url+"/butterfly")
					expect(resp.status).toEqual(404);
		});

        it("get list species", async()=>{
			expect.assertions(1);
            let resp = await fetch (url)
					expect(resp.status).toEqual(200);
		});
});
