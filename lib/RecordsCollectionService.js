const logger = require("winston");
const q = require('q');
const config = require("config");
const ErrorMessageFactory = require("./errors/ErrorFactory");
const RecordsCollection = require("./data/mongo/collections/RecordsCollection");

class RecordsCollectionService{

    static store(record){
        return RecordsCollection.store(record)
            .then(function success(resultObj){
                return q.resolve(resultObj);
            })
            .catch(function error(error){
                let errMsg = ErrorMessageFactory.createError(error);
                errMsg.setStack(error.stack);
                errMsg.setMessage(error.message);
                return q.reject(errMsg);
            })
    }

    static findAll(){
        return RecordsCollection.findAll()
            .then(function success(resultArray){
                return q.resolve(resultArray);
            })
            .catch(function error(error){
                let errMsg = ErrorMessageFactory.createError(error);
                errMsg.setStack(error.stack);
                errMsg.setMessage(error.message);
                return q.reject(errMsg);
            })
    }

    static findByType(type){
        return RecordsCollection.findByType(type)
            .then(function success(resultArray){
                return q.resolve(resultArray);
            })
            .catch(function error(error){
                let errMsg = ErrorMessageFactory.createError(error);
                errMsg.setStack(error.stack);
                errMsg.setMessage(error.message);
                return q.reject(errMsg);
            });
    }
}

module.exports = RecordsCollectionService;