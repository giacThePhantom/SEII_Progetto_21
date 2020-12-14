const fetch = require("node-fetch");
const url = "https://se-2-progetto-21.herokuapp.com/api/v2/species"

/*
species/
species/mus_musculus/
species/nonexistingspecies/
species/mus_musculus/ENSMUSG00000118659
species/homo_sapiens/ENSMUSG00000118659
*/


describe('species.test', () => {
	it("get species", () => {
		expect.assertions(1);
		return fetch(url).then( r => r.json()).then(data => {
			expect(data).toStrictEqual(
				[{"name":"rattus_norvegicus"},{"name":"danio_rerio"},{"name":"mus_musculus"},{"name":"gallus_gallus"},{"name":"homo_sapiens"}]
			);
		});
	});

	it("get singular specie", () => {
		expect.assertions(1);

		return fetch(url + '/mus_musculus').then( r => r.json()).then(data => {
			expect(data['name']).toContain(
				'mus_musculus'
			);
		});
	});
	it("Error on requesting specie", () => {
		expect.assertions(1);

		return fetch(url + '/nonexistingspecies').then( r => r.json()).then(data => {
			expect(data).toStrictEqual({"error":"Cannot find species nonexistingspecies"});
		});
	});
	it("get specie's gene", () => {
		expect.assertions(1);

		return fetch(url+ '/mus_musculus/ENSMUSG00000118659').then( r => r.json())
		.then(data => {
			expect(data['id']).toStrictEqual('ENSMUSG00000118659');
		});
	});
	it("specie's gene error", () => {
		expect.assertions(1);

		return fetch(url+ '/homo_sapiens/ENSMUSG00000118659').then( r => r.json())
		.then(data => {
			expect(data).toStrictEqual({"error":"Cannot find gene in species homo_sapiens"});
		});
	});
});
