const htmlParser = require("htmlparser2");
const logger = require("winston");

class GenericParser{
    constructor(unparsedHtml){
        this.original = unparsedHtml;
        this.parser = new htmlParser.Parser({
            onopentag: function(name, attribs){
                if(name === "script" && attribs.type === "text/javascript"){
                    logger.info("JS! Hooray!");
                }
            },
            ontext: function(text){
                logger.info("-->", text);
            },
            onclosetag: function(tagname){
                if(tagname === "script"){
                    logger.info("That's it?!");
                }
            }
        }, {decodeEntities: true});
    }

    parse(){
        this.parser.write(this.original);
    }
}

module.exports = GenericParser;