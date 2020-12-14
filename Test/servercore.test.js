const fetch = require("node-fetch");
const url = "https://se-2-progetto-21.herokuapp.com/api/v2/species"


describe('servercore.test', () => {
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
