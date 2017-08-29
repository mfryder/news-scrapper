const mongoose = require('mongoose');
const Records = mongoose.model("Records");
const AbstractCollection = require("./AbstractCollection");
const logger = require('winston');

class RecordsCollection extends AbstractCollection{

    static store(record){
        let recordToBeStored = new Records(record);
        return recordToBeStored.save();
    }

    static findAll(){
        return Records.find();
    }

    static findByType(type){
        return Records.find({"source": type});
    }
}

module.exports = RecordsCollection;