var express = require('express');
var router = express.Router();
var RecordsCollectionService = require('../lib/RecordsCollectionService');
var logger = require('winston');
router.get('/all', getAllRecords);
router.get('/type/:type', getRecordsByType);

function getAllRecords(req, res, next){
    RecordsCollectionService.findAll()
        .then(function success(results){
            res.send(results);
        })
        .catch(function error(err){
            var statusCode = 500;
            var message = "The system failed to respond correctly";
            if(err.statusCode){
                statusCode = err.statusCode;
            }
            if(err.message){
                message = err.message;
            }
            if(err.stack){
                logger.error(err.stack)
            }
            res.status(statusCode).send(message);
        })
}

function getRecordsByType(req, res, next){
    RecordsCollectionService.findByType(req.params.type)
    .then(function success(results){
        res.send(results);
    })
    .catch(function error(err){
        var statusCode = 500;
        var message = "The system failed to respond correctly";
        if(err.statusCode){
            statusCode = err.statusCode;
        }
        if(err.message){
            message = err.message;
        }
        if(err.stack){
            logger.error(err.stack)
        }
        res.status(statusCode).send(message);
    })
}

module.exports = router;