const express = require('express');
const router = express.Router();
const conn = require('../Ensembl_communication/db_conn.js')

//insert a new qanda in the db

/*
 *@param {}
 *@param {}
 */
router.post('', async (req,res) => {
    console.log("\n\nPOST request received\n");
    let user_gene = req.body.user_gene;
    let user = req.body.token.self;
    console.log(user_gene);
    //check that all the parameters are strings
    try{
      user_gene=JSON.parse(user_gene);
      user_gene.id=user.substring(user.lastIndexOf("/")+1)+Math.floor(Math.random()*10);

      //lo metto nel database
      let ug_id = await db.insert_user_gene(user_gene);
      if(ug_id)
        res.location('/api/v2/usergene/'+ ug_id).status(201).send();
      else{
        res.status(500).json({message : 'Internal server error'});
      }
    }
    catch{
      res.status(400).json({message : 'Bad parameters'});
    }
});


module.exports = router;
