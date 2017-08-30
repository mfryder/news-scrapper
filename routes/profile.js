var express = require('express');
var router = express.Router();
var ProfileService = require('../lib/ProfileService');
var logger = require('winston');

router.get('/all/:type', getFullProfile);                           //express setting the route path information and what function will be called
router.get('/recalculate/:type', reCalculateProfile);               


function getFullProfile(req, res, next){                            //node contains the request object, response object, and the next in chain
    ProfileService.findByType(req.params.type)
        .then(function success(responseObj){
            res.send(responseObj);                                  //node sending response object
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
        });
}

function reCalculateProfile(req, res, next){
    ProfileService.reCalculateProfile(req.params.type)
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
        });
}

module.exports = router;                                            //exporting back express router information about Profile route