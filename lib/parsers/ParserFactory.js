const ParserType = require("../enum/ParserTypeEnumeration");
const GenericParser = require("./GenericParser");
const CnnParser = require("./CnnParser");

class ParserFactory{

    static createParser(type, unparsedHtml){
        let parser;
        switch(type){
            case ParserType.CNN:
                parser = new CnnParser(unparsedHtml);
            break;
            default:
                parser = new GenericParser(unparsedHtml);
        }
        return parser;
    }
}
module.exports = ParserFactory;