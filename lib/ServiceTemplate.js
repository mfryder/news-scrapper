const request = require("request");
const q = require("q");
const ErrorMessageFactory = require("./errors/ErrorFactory");

function callback(error, response, body, deferred){
    if(error){
        let errMsg = ErrorMessageFactory.createError(response);
        errMsg.setStack(error.stack);
        errMsg.setMessage(error.message);
        deferred.reject(errMsg);
    }else{
        if(response.statusCode > 399 &&  response.statusCode < 600){
            let errMsg = ErrorMessageFactory.createError(response);
            deferred.reject(errMsg);
        }else{
            deferred.resolve(response);
        }
    }
}

class ServiceTemplate{
    static post(options){
        var deferred = q.defer();
        request(options, function(error, response, body){
            callback(error, response, body, deferred);
        });
        return deferred.promise;
    }

    static get(options){
        var deferred = q.defer();
        request(options, function(error, response, body){
            callback(error, response, body, deferred);
        });
        return deferred.promise;
    }

    static put(options){
        var deferred = q.defer();
        request(options, function(error, response, body){
            callback(error, response, body, deferred);
        });
        return deferred.promise;
    }

    static head(options){
        var deferred = q.defer();
        request(options, function(error, response, body){
            callback(error, response, body, deferred);
        });
        return deferred.promise;
    }
}

module.exports = ServiceTemplate