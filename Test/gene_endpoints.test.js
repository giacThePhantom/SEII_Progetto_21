const app = require("../servercore/app");
const fetch = require("node-fetch");
const url = "http://localhost:3000/api/v2/gene/"


describe('gene-api.test', () => {
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
    it("get 404 status of non existing", async()=>{
        expect.assertions(1);
        let resp = await fetch (url+"QWERTY")
                expect(resp.status).toEqual(404);
    });

    //gene/ENSMUSG00000118659, ok status
	it("get ok status existing gene", async () => {
		expect.assertions(1);
		let resp =await fetch(url+"ENSMUSG00000118659")
			expect(resp.status).toEqual(200);
    });

    //gene/ENSMUSG00000118659, get field
    it("get species field",()=>{
        expect.assertions(1);
        return fetch(url+"ENSMUSG00000118659")
                .then(r => r.json())
                .then( data => {
                    expect({species:data["species"]}).toEqual( {species:"mus_musculus"})
                } )
    });

    it("get species description",()=>{
        expect.assertions(1);
        return fetch(url+"ENSMUSG00000118659")
                .then(r => r.json())
                .then( data => {
                    expect({biotype:data["biotype"]}).toEqual( {biotype:"lincRNA"})
                } )
    });

    //gene/ENSMUSG00000118659?format=condensed
    it("get condensed existing gene", async () => {
		expect.assertions(1);
		let resp = await fetch(url+"ENSMUSG00000118659"+"?format=condensed").then( r => r.json()).then(data => {
			expect(data).toEqual( {"biotype": "lincRNA", "chromosome": "3", "description": "novel transcript", "end": 140917459, "homologies": [], "id": "ENSMUSG00000118659", "species": "mus_musculus", "start": 140909770, "strand"
            : -1, "version": 1}
            );

        })
    })

    //gene/nonexistinggene?format=condensed
    it("get 404 status of nonexisting + condensed", async()=>{
        expect.assertions(1);
        let resp = await fetch (url+"QWERTY"+"?format=condensed")
                expect(resp.status).toEqual(404);
    });
})
