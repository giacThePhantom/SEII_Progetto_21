const app = require("../login/login_core.js");
const fetch = require("node-fetch");
const url = "http://localhost:3000/api/v2/gene/"


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
        console.log('Closing server');
        server.close( );
				done();
    });

    //gene/QWERTY 
    it("get 404 status", async()=>{
        expect.assertions(1);
        let resp = await fetch (url+"QWERTY")
                expect(resp.status).toEqual(404);
    });

    //gene/ENSMUSG00000118659, ok status
	it("get ok status", async () => {
		expect.assertions(1);
		let resp =await fetch(url+"ENSMUSG00000118659")
			expect(resp.status).toEqual(200);
    });

    //gene/ENSMUSG00000118659, get field
    it("get sequence field", async()=>{
        expect.assertions(1);
        let resp = await fetch (url+"ENSMUSG00000118659")
                expect(resp.status).toContain("sequence");
    });



    //gene/ENSMUSG00000118659?format=condensed
    it("get condensed gene", () => {
		expect.assertions(1);
		return fetch(url+"ENSMUSG00000118659"+"?format=condensed").then( r => r.json()).then(data => {
			expect(data).toEqual("{\"id\":\"ENSMUSG00000118659\",\"species\":\"mus_musculus\",\"version\":1,\"start\":140909770,\"end\":140917459,\"biotype\":\"lincRNA\",\"chromosome\":\"3\",\"strand\":-1,\"description\":\"novel transcript","homologies\":[]}");

        })
    })

    //gene/nonexistinggene?format=condensed
    it("get single gene", () => {
		expect.assertions(1);
		return fetch(url+"QWERTY"+"?format=condensed").then( r => r.json()).then(data => {
			expect(data).toEqual();

        })
    })
})

/*
            gene/nonexistinggene ok
            gene/nonexistinggene?format=condensed
            gene/nonexistinggene?format=full
            gene/ENSMUSG00000118659
            gene/ENSMUSG00000118659?format=condensed
            gene/ENSMUSG00000118659?format=full
            gene/sequence/nonexistinggene
            gene/sequence/ENSMUSG00000118659*/

