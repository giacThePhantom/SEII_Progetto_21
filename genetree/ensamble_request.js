const https = require('https')
const options = {
  hostname: 'rest.ensembl.org',
  port: 443,
  path: '/genetree/member/id/',
  method: 'GET'
}


var tree_function = async function tree_req (geneid){
    options.path=options.path+geneid+'?content-type=application/json';
    const req = https.request(options, res => {
        console.log("statusCode"+ res.statusCode);
        console.log(res);
      
        body = [];
        res.on('data', (chunk) => {
          body.push(chunk);
          }).on('end', () => {
             body = Buffer.concat(body).toString();
             console.log(body);
             return 'body';
      }) 
      
    })

      req.on('error', error => {
        console.error(error)
        //return error;
      })
      
      req.end();
      //return;
}

module.exports={tree_req:tree_function};