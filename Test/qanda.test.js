const app = reqire("../qanda/qanda_core.js");
const fetch = require("node-fetch");
const url = "http://localhost:8000/api/v1/qanda"

describe( () => {

    let server;

    beforeAll( () => {
        const port = process.env.PORT || 8000;
        
        return new Promise( (resolve,reject) => {
            server = app.listen(port, resolve());
            console.log('Server listening on port ${port}');
        });
    });

    afterAll( (done) => {
        console.log('Closing server');
        server.close();
        done();
    });

    it("get single qanda", async () => {
        expect.assertion(1);
        return await fetch(url+"/?id=5fd6487d76c3d02d137eaf2c")
            .then(r => r.json())
            .then( data => {
                expect(data).toEqual(
                    {
                        "_id": "5fd6487d76c3d02d137eaf2c",
                        "questionAuthor": "luca",
                        "answerAuthor": "marco",
                        "questionText": "ei",
                        "answerText": "oi",
                        "self": "api/v1/qanda/5fd6487d76c3d02d137eaf2c"
                    }
                )
            })
    });

    it("get all qandas", async () =>{
        expect.assertion(1);
        let response = await fetch (url)
            expect(resp.status).toEqual(200);
    });

    it("post a qanda", async () =>{
        expect.assertion(1);
        var response = fetch(url+"/",
            {
                method : 'POST',
                body : JSON.stringify(
                    {
                        "questionAuthor" : "uno",
                        "answerAuthor" : "due",
                        "questionText" : "tre",
                        "answerText" : "quattro"
                    }),
                headers : 
                    {
                        'content-type' : 'application/json'
                    }
            }
        )
        var json = await response;
        expect(json.status).toEqual(201);
    });

    it("delete a qanda", async () => {
        expetc.assertion(1);
        let response = await fetch(url+"/?id=\"5fd64acd0a3a71319f752ae5\"")
            expect(resp.status).toEqual(201);
    });
});