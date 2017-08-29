const GenericParser = require("./GenericParser");
const htmlParser = require("htmlparser2");
const logger = require("winston");

var temp;

class CnnParser extends GenericParser{
    constructor(type, unparsedHtml){
        super(type, unparsedHtml);
        this.parsedObject = null;
        temp = this;
    }

    parse(){
        this.parser = new htmlParser.Parser({
            ontext: function(text){
                if(text.indexOf("CNN.contentModel = ") > -1){
                    let isolatedContent = text.substring(text.indexOf("CNN.contentModel = ")+ 19, text.length -1);
                    isolatedContent = isolatedContent.replace(/\s+/g,' ')
                                                    .replace(/\\n/g, "\\n")  
                                                    .replace(/\\'/g, "\\'")
                                                    .replace(/\\"/g, '\\"')
                                                    .replace(/\\&/g, "\\&")
                                                    .replace(/\\r/g, "\\r")
                                                    .replace(/\\t/g, "\\t")
                                                    .replace(/\\b/g, "\\b")
                                                    .replace(/\\f/g, "\\f").trim();
                    isolatedContent = isolatedContent.replace(/[\u0000-\u001F]+/g,"");
                    let objKeysRegex = /({|,)(?:\s*)(?:')?([A-Za-z_$\.][A-Za-z0-9_ \-\.$]*)(?:')?(?:\s*):/g; // look for object names
                    isolatedContent = isolatedContent.replace(objKeysRegex, "$1\"$2\":"); // all object names should be double quoted
                    //hack cause cnn sucks and used a , then a : which breaks my objKeysRegex to turn their dumb object keys into something parseable.
                    //isolatedContent = isolatedContent.replace("\"President Donald Trump initially responded in characteristic fashion\"", "'President Donald Trump initially responded in characteristic fashion'");
                    logger.info(isolatedContent);
                    isolatedContent = JSON.parse(isolatedContent);
                    temp.parsedObject = isolatedContent;
                }
            },
        }, {decodeEntities: true});
        super.parse();
    }

    getParsedObject(){
        return this.parsedObject;
    }
}

module.exports = CnnParser;