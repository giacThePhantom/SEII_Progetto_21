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

		return fetch(url + 
});
