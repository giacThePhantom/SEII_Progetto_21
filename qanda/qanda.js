const express = require('express');
const router = express.Router();
const db = require('./db.js');

//get all the qanda in the collection
router.get('',async (req,res) => {
    //console.log('\nGET request received\nLooking for ID ...');

    if(!req.query.id){
        //console.log("not found\nGET all qanda");
        let qandas = await db.qandas();
        if(qandas){
            res.status(200).json(qandas);
        }else{
            res.status(404).json({message : 'Qandas not found'});
        }
    }else{
        //console.log("found...\nLooking for qanda with ID : ",req.query.id," ...\n\n");
        let qanda = await db.get_qanda_by_id(req.query.id);
        if(qanda){
            //console.log(qanda);
            res.status(200).json(qanda);
        }else{
            res.status(404).json({message : 'qanda not found\n'});
        }
    }
});

//insert a new qanda in the db
router.post('', async (req,res) => {
    //console.log("\n\nPOST request received\n");
    let qanda = {
        questionAuthor: req.body.questionAuthor,
        answerAuthor: req.body.answerAuthor,
        questionText: req.body.questionText,
        answerText: req.body.answerText
    }
    //console.log(qanda);
    //check that all the parameters are strings
    if(typeof(qanda.questionAuthor) == "string" && typeof(qanda.answerAuthor) == "string" && typeof(qanda.questionText) == "string" && typeof(qanda.answerText) == "string"){
        let qanda_id = await db.insert_qanda(qanda); //insert_qanda non ritorna id, giusto?
				if(qanda_id){
					res.location('/api/v2/qanda/'+ qanda_id).status(201).json({id:qanda_id,message : 'Question added to FAQs'});
        	//console.log('Inserted qanda with id',qanda_id, "\n");
				}
				else{
	        res.status(400).json({message : 'Faq already in the database'});
				}
    }else{
        //console.log('Parameter error, all parameters need to be string');
        res.status(400).json({message : 'All parameters need to be string'});
    }

});

//delete an existing qanda
router.delete('', async(req,res) => {
    //console.log(req);
    let qanda_id = req.body.id;    //non prende l'id, { id : undefined };

    //console.log("qanda ID : ",qanda_id);
    let del = await db.delete_qanda(qanda_id);
    if(del.ok){
        if(del.n==1){
            res.status(201).send('Eliminato '+qanda_id+' '+JSON.stringify(del));
        }else{
            res.status(204).send('Nessuna qanda corrispondente all\'ID passato');
        }
    }else{
        res.status(404).send('Errore durante l\'eliminazione');
    }
});

//req.id_domanda
//req.answerAuthor
//req.answerText
router.post('/answer', async (req,res) => {
    //console.log("\n\nPOST request received\n");
    let qanda = await db.update_qanda_id(req.body._id,req.body.answerText,req.body.answerAuthor); //insert_qanda non ritorna id, giusto?
    if(qanda.nModified){
      res.status(201).send();
    }
    else{
        res.status(400).json({message : 'No question modified'});
    }
});



module.exports = router;
