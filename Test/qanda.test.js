const { identity } = require("lodash");
const fetch = require("node-fetch");
const db = require("../qanda/db.js");
const url = "https://se-2-progetto-21.herokuapp.com/api/v2/qanda"

describe('qanda.test', () => {

    var qanda_id;

    it("post a qanda", async () =>{
        expect.assertions(1);
        jest.setTimeout(1200000);
        var response = await fetch(url+"/",
            {
                method : 'POST',
                body : JSON.stringify(
                    {
                        "questionAuthor" : "autoreuno",
                        "answerAuthor" : "autoredue",
                        "questionText" : "domandatre",
                        "answerText" : "rispostaquattro"
                    }),
                headers : 
                    {
                        'content-type' : 'application/json'
                    }
            }
        ).then(r => r.json())
        .then( data => {
        expect(data).toEqual( {error: "This email is already in our database"});
   })
        var json = await response;
        qanda_id = json._id;
        console.log("\n\nID: ",qanda_id);
        expect(json.status).toEqual(201);
    });

    it("get single qanda", async () => {
        expect.assertions(1);
        jest.setTimeout(1200000);
        return await fetch(url+"/?id="+qanda_id)
            .then(r => r.json())
            .then( data => {
                expect(data).toEqual(
                    {
                        "_id": qanda_id,
                        "questionAuthor": "uno",
                        "answerAuthor": "due",
                        "questionText": "tre",
                        "answerText": "quattro",
                        "self": "api/v2/qanda/"+qanda_id
                    }
                )
            }
        )
    });

    it("get all qandas", async () =>{
        expect.assertions(1);
        jest.setTimeout(1200000);
        let response = await fetch (url)
            expect(response.status).toEqual(200);
        return response;
    });

    it("delete a qanda", async () => {
        expect.assertions(1);
        jest.setTimeout(1200000);
        let response = await fetch(url+qanda_id)
            expect(response.status).toEqual(200);
        return response;
    });
});