const config = require("config"); 
const ServiceTemplate = require("./ServiceTemplate");
const ParserFactory = require("./parsers/ParserFactory");
const NaturalLanguageProcessService = require("./NaturalLanguageProcessService");
const RecordsCollectionService = require("./RecordsCollectionService");
const logger = require("winston");
const q = require('q');
const Record = require('./records/Record');
const Entity = require('./records/Entity');
const PartOfSpeechEnum = require("./enum/PartOfSpeechEnumeration");

class ScrapperService{

    static getRaw(type){
        let options = {};
        options.url = config.get('types.cnn.host');
        return ServiceTemplate.get(options)
            .then(function success(response){
                
                return q.resolve(response.body);
            })
            .catch(function error(err){
                logger.error(err.getStack());
                return q.reject(err);
            });
    }

    static handleItem(article){
        //MOVE TO A type based Record builder
        let record = new Record();
        record.setTitle(article.headline);
        record.setDescription(article.description);
        record.setSource("cnn");
        record.setDate(new Date());

        //return NaturalLanguageProcessService.processTestValues(record);
        return NaturalLanguageProcessService.processValues(record);
    }

    static handleArray(articleList, counter, recordArray){
        let deferred = q.defer();
        let that = this;
        this.handleItem(articleList[counter])
            .then(function continueOn(result){
                recordArray.push(result);
                counter++;
                logger.info(counter);
                if(counter >= articleList.length - 1){
                    deferred.resolve();
                }else{
                    that.handleArray(articleList, counter, recordArray)
                        .then(function success(){
                            deferred.resolve();
                        })
                        .catch(function error(error){
                            deferred.reject(error);
                        });
                }
            })
            .catch(function error(error){
                deferred.reject(error);
            })
        return deferred.promise;
    }

    static getParsed(type){
        let that = this;
        let recordArray = [];
        return this.getRaw(type)
            .then(function success(responseBody){
                let parser = ParserFactory.createParser(type, responseBody);
                parser.parse();
                let parsedObject = parser.getParsedObject();
                let promiseArray = [];
                return that.handleArray(parsedObject.siblings.articleList, 0, recordArray);
            })
            .then(function nlpFinished(){
                let promiseArray = [];
                for(let record in recordArray){
                    promiseArray.push(RecordsCollectionService.store(recordArray[record]));
                }
                return q.all(promiseArray);
            }).catch(function error(err){
                logger.error(err);
                return q.reject(err);
            })
    }
}

module.exports = ScrapperService;