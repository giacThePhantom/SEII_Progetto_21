const fetch = require("node-fetch");
const url = "https://se-2-progetto-21-test.herokuapp.com/api/v2/qanda"

describe('qanda.test', () => {

	var qanda_id;
	it("post a qanda", () => {
		expect.assertions(1);
		return fetch(url + "/", {
				method: 'POST',
				body: JSON.stringify({
					"questionAuthor": "questionAuthor111",
					"answerAuthor": "answerAuthor111",
					"questionText": "questionText111",
					"answerText": "answerText111"
				}),
				headers: {
					'content-type': 'application/json'
				}
			}).then(r => r.json())
			.then(data => {
				qanda_id = data.id;
				expect(data).not.toBeNull();;
			})
	});
	it("get single qanda", () => {
		expect.assertions(1);
		return fetch(url + "/?id=" + qanda_id)
			.then(r => r.json())
			.then(data => {
				expect(data).toEqual({
					"_id": qanda_id,
					"questionAuthor": "questionAuthor111",
					"answerAuthor": "answerAuthor111",
					"questionText": "questionText111",
					"answerText": "answerText111",
					"self": "api/v2/qanda/" + qanda_id
				})
			})
	});

	it("get all qandas", () => {
		expect.assertions(1);
		return fetch(url).then((res) => {
			expect(res.status).toEqual(200)});
	});
	it("delete a qanda", () => {
		expect.assertions(1);
		return fetch(url,
				{
				 method: 'DELETE',
				 body: JSON.stringify({id: qanda_id}),
				 headers: {
				 'Content-Type': 'application/json'
			 }
		 }).then((res)=>{	expect(res.status).toEqual(201)});
	});
});
