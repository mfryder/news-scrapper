var express = require('express');
var router = express.Router();
var ScrapperService = require('../lib/ScrapperService');
var logger = require('winston');

//express setting the route path information and what function will be called
router.get('/raw/:type', getRaw);
router.get('/parsed/:type', getParsed);


function getRaw(req, res, next){                                                        //node contains the request object, response object, and the next in chain
    ScrapperService.getRaw(req.params.type)
        .then(function success(responseObj){
            res.send(responseObj);                                                      //node sending response object
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

function getParsed(req, res, next){
    ScrapperService.getParsed(req.params.type)
    .then(function success(responseObj){
        res.send(responseObj);
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

module.exports = router;                                                    //exporting back express router information about Profile route