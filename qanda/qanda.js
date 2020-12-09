const express = require('express');
const router = express.Router();
const db = require('./db.js');

//get all the qanda in the collection
router.get('',async (req,res) => {
    console.log('get \'/\' received');
    let qandas = await db.qandas();
    if(qandas){
        res.status(200).json(qandas);
    }else{
        res.status(404).json({message : 'Qandas not found'});
    }
});

//get qanda info by id
router.get('/:id',async (req,res) => {
    let qanda = await db.get_qanda_by_id(req.params.id);
    console.log(qanda);
    if(qanda){
        res.status(200).json(qanda);
    }else{
        res.status(404).json({message : 'qanda not found'});
    }
});

//insert a new qanda in the db
router.post('', async (req,res) => {
    let qanda = {
        questionAuthor: req.body.questionAuthor,
        answerAuthor: req.body.answerAuthor,
        questionText: req.body.questionText,
        answerText: req.body.answerText
    }
    console.log(qanda);
    //check that all the parameters are strings
    if(typeof(qanda.questionAuthor) == "string" && typeof(qanda.answerAuthor) == "string" && typeof(qanda.questionText) == "string" && typeof(qanda.answerText) == "string"){
        let qanda_id = await db.insert_qanda(qanda); //insert_qanda non ritorna id, giusto?
        res.location('/api/v1/qanda/'+ qanda_id).status(201).send();
        console.log('inserted qanda with id',qanda_id);
    }else{
        console.log('Parameter error, all parameters need to be string');
        res.status(400).json({message : 'All parameters need to be string'});
    }
    
});

//delete an existing qanda
router.delete('', async(req,res) => {
    let qanda = {
        id : req.body.id
    }
    console.log(qanda);
    let del = await db.delete_qanda(qanda.id);
    if(del.ok){
        if(del.n==1){
            res.status(201).send('Eliminato '+qanda.id+' '+JSON.stringify(del));
        }else{
            res.status(201).send('Nessuna qanda corrispondente all\'ID passato');
        }
    }else{
        res.status(404).send('Errore durante l\'eliminazione');
    }
});

module.exports = router;