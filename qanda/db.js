//simple database like collection of data
const mongoose=require("mongoose")
const conn = require('../Ensembl_communication/db_conn.js'); //qui devo mettere il mio db 
const models = require('../Ensembl_communication/models.js');
const { qandas_model } = require("../Ensembl_communication/models.js");
const uri = 'mongodb://127.0.0.1:27017/genes';

//return the entire collection of qanda
let qandas = async () => {
    let qanda = await models.qandas_model.find({});
    return qanda;
}

//check if the qanda already exists in the db, used in the insert qanda
//function to avoid duplicates
async function qanda_already_saved(model, qanda_info){
    let data = await model.find({'questionText': qanda_info.questionText});
    let res;
    if(data.length > 0){
        res = true;
    }else{
        res = false;
    }
    return res;
}

module.exports = {
    qandas:qandas,
        insert_qanda:async(qanda_info) => {
            qanda_info.id = await models.qandas_model.find({}).count();
            let to_be_saved = !(await qanda_already_saved(models.qandas_model,qanda_info));
            if(to_be_saved){
                let to_be_inserted = await new models.qandas_model(qanda_info);
                await to_be_inserted.save((err) => {console.log(err,'Inserted correctly','inserted qanda info');});
                return qanda_info.id;
            }else{
                return to_be_saved;
            }
        },
        delete_qanda:async(id) => {
            let data = models.qandas_model.deleteOne({'id':id});
            return data;
        },
        get_qanda_by_id:async(id) => {
            let qanda = await models.qandas_model.findOne({'id':id});
            if(qanda){
                var qanda_info = {
                    id: qanda.id,
                    questionAuthor: qanda.questionAuthor,
                    answerAuthor: qanda.answerAuthor,
                    questionText: qanda.questionText,
                    answerText: qanda.answerText,
                    self: "api/v1/qanda/"+qanda.id
                }
            }else{
                var qanda_info = null;
            }
            return qanda_info;
        }
}