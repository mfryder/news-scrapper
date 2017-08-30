var express = require('express');
var router = express.Router();
var ProfileService = require('../lib/ProfileService');
var logger = require('winston');
router.get('/all/:type', getFullProfile);
router.get('/recalculate/:type', reCalculateProfile);


function getFullProfile(req, res, next){
    ProfileService.findByType(req.params.type)
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

module.exports = router;