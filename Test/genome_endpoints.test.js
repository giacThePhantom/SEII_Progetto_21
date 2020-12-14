const fetch = require("node-fetch");
const url = "https://se-2-progetto-21.herokuapp.com/api/v2/genome/"

describe('genome.test', () => {
	it("genome of existing species", () => {
		expect.assertions(1);

		return fetch(url + 'nonexistingspecies').then( r => r.json()).then(data => {
			expect(data).toStrictEqual(
				{error: "Genome of species: nonexistingspecies doesn't exists"}
			);
		});
	});
	
	it("genome of mus_musculus", () => {
		expect.assertions(1);

		return fetch(url + 'mus_musculus').then r => r.json()).then(data => {
			expect(data).toStrictEqual(

			);
		});
	});
				
	it("genome of non existing species from 0 to 1000", () => {
		expect.assertions(1);

		return fetch(url + 'mus_musculus/0/1000').then r => r.json()).then(data => {
			expect(data).toStrictEqual(

			);
		});
	});
	
	it("genome of mus_musculus from 0 to 1000", () => {
		expect.assertions(1);

		return fetch(url + 'mus_musculus').then r => r.json()).then(data => {
			expect(data).toStrictEqual(

			);
		});
	});

	it("genome of mus_musculus ", () => {
		expect.assertions(1);

		return fetch(url + 'mus_musculus').then r => r.json()).then(data => {
			expect(data).toStrictEqual(

			);
		});
	});

});
