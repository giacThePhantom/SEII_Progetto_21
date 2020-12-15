const fetch = require("node-fetch");
const url = "https://se-2-progetto-21.herokuapp.com/api/v2/qanda"

describe('qanda.test', () => {

	var qanda_id;
	it("post a qanda", async () => {
		expect.assertions(1);
		return await fetch(url + "/", {
				method: 'POST',
				body: JSON.stringify({
					"questionAuthor": "questionAuthor",
					"answerAuthor": "answerAuthor",
					"questionText": "questionText",
					"answerText": "answerText"
				}),
				headers: {
					'content-type': 'application/json'
				}
			}).then(r => r.json())
			.then(data => {
				qanda_id = data;
				expect(data).not.toBeNull();;
			})
	});
	it("get single qanda", async () => {
		expect.assertions(1);
		return await fetch(url + "/?id=" + qanda_id)
			.then(r => r.json())
			.then(data => {
				expect(data).toEqual({
					"_id": qanda_id,
					"questionAuthor": "questionAuthor",
					"answerAuthor": "answerAuthor",
					"questionText": "questionText",
					"answerText": "answerText",
					"self": "api/v2/qanda/" + qanda_id
				})
			})
	});

	it("get all qandas", async () => {
		expect.assertions(1);
		let response = await fetch(url)
		expect(response.status).toEqual(200);
		return response;
	});
	it("delete a qanda", async () => {
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
