const fetch = require("node-fetch");
const url = "https://se-2-progetto-21.herokuapp.com/api/v2/species"

describe('species.test', () => {
	it("get species", () => {
		expect.assertions(1);

		return fetch(url).then( r => r.json()).then(data => {
			expect(data).toStrictEqual(
				[{"name":"rattus_norvegicus"},{"name":"danio_rerio"},{"name":"mus_musculus"},{"name":"gallus_gallus"},{"name":"homo_sapiens"}]
			);
		});
	});
});
