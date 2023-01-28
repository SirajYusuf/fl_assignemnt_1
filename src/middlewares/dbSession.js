const mongoose = require("mongoose");

const Helper = require("../helpers/helper")

class DbTransactionHelper{

    async transaction(req, res, next){
        const session = await mongoose.startSession()
        session.startTransaction();
        console.log("=========================== DB Transaction started =========================== ");
        try {
            req.dbSession = session;
            res.on('finish', async function(){
                if(res.statusCode > 300) {
                    await session.abortTransaction();
                    console.log(" =========================== DB Transaction aborted =========================== ")
                    session.endSession();
                }else{
                    await session.commitTransaction();
                    console.log(' ============================ DB Transaction committed =========================== ')
                    session.endSession();
                }
            });
            next();
        } catch (e) {
            Helper.getAuthErrorMessage(res, e ? e.message : " =========================== DB Transaction error =========================== ")
        }
    }

}

module.exports = new DbTransactionHelper();