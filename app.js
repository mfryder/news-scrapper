/////////////////////////////////////////Entry point//////////////////////////////////////////

////Require statements/////////////////////////////////////////////
//Require statements allow developers to pull in exported modules
//from either current code base or third party saved modules.
//Third part modules are brought in by placing them in the package.json
//file and then running npm install. You can also run npm install (package) --save
//to have the package information stored in package.json for you.

const express = require('express');                     //express module (third party)
const path = require('path');                           //used for hosting webpage files from dist into express (third party)
const favicon = require('serve-favicon');               //webpage facivon (third party)
const logger = require('winston');                      //logging module (third party)
const bodyParser = require('body-parser');              //module to allow json body to be parsed (mainly used in middleware) (third party)
const http = require('http');                           //node specific module (used for http based module services)
const config = require('config');                       //configuartion module. Allows for adding in properties in json format. Can have overrides (third party)
const mongoose = require('mongoose');                   //mongo module for handling connections with mongo server (third party)

const app = express();                                  
const socketServer = require("./lib/socket/socketServer");   

mongoose.connect('mongodb://'+ config.get('mongo.hostname') + ':'+config.get('mongo.port')+ '/' + config.get('mongo.db'));  //mongoose
let db = mongoose.connection;                                          //links in connection with mongo
db.on('error', function(err){
    logger.error(err);
});
db.once('open', function() {                                    
    logger.info("Connection to Mongo has been opened");
    const mongoModels = require('./lib/data/mongo/models');    
    mongoModels.initialize();                                         //initializes all mongo models with their schemas

    app.use(bodyParser.json());                                       //load in json parsing into the middleware on all routes (express)
    app.use(express.static(path.join(__dirname, 'dist')));
    
    //setting up routes and tying them to express   
    const scrapper = require('./routes/scrapper');
    const newsProfile = require('./routes/profile');
    const records = require('./routes/records');

    app.use('/scrapper', scrapper);
    app.use('/newsProfile', newsProfile);
    app.use('/records', records);
    app.set('port', 3000);                                          //sets express port to use same as server
    
    var server = http.createServer(app);                            //Creates the node server
    server.listen(3000);                                            //tells the server to listen on that port
    socketServer.initializeServer();
});

module.exports = app;