const Language = require('@google-cloud/language');
const logger = require("winston");
const Record = require('./records/Record');
const Entity = require('./records/Entity');
const PartOfSpeechEnum = require("./enum/PartOfSpeechEnumeration");
const q = require("q");
const testResult = require('../test/config/examples/naturalLanguageProcessingResult');
const language = Language();


class NaturalLanguageProcessService{

    static analyzeEntities(text){
        let document = {
            'content': text,
            type: 'PLAIN_TEXT'
        };
        return language.analyzeEntities({ document: document })
        .then( function success(results) {
            let returnObj = {};
            returnObj.entities = results[0].entities;
            return q.resolve(returnObj);
        });
    }

    static analyzeSyntax(text){
        let document = {
            'content': text,
            type: 'PLAIN_TEXT'
        };
        return language.analyzeSyntax({ document: document })
        .then( function success(results) {
            let returnObj = {};
            returnObj.syntax = results[0];
            return q.resolve(returnObj);
        });
    }

    static analyzeSentiment(text){
        let document = {
            'content': text,
            type: 'PLAIN_TEXT'
        };
        return language.analyzeSentiment({ document: document })
        .then( function success(results) {
            let returnObj = {};
            returnObj.sentiment = results[0].documentSentiment;
            return q.resolve(returnObj);
        });
    }

    static generateEntitiesFromNLang(nLangEntities, record){
        let entities = [];
        for(let idx in nLangEntities){
            let entity = new Entity();
            entity.setName(nLangEntities[idx].name);
            entity.setEntityType(nLangEntities[idx].type);
            entity.setSalience(nLangEntities[idx].salience);
            entities.push(entity);
        }
        record.setEntities(entities);
    }

    static generateSyntaxObjectFromNLang(tokens, record){
        let nouns = [];
        let verbs = [];
        let adj = [];

        for(let token in tokens){
            switch(tokens[token].partOfSpeech.tag){
                case PartOfSpeechEnum.NOUN:
                    nouns.push(tokens[token].text.content);
                break;
                case PartOfSpeechEnum.VERB:
                    verbs.push(tokens[token].text.content);
                break;
                case PartOfSpeechEnum.ADJ:
                    adj.push(tokens[token].text.content);
                break;
                default:
            }
        }
        record.setAdj(adj);
        record.setNouns(nouns);
        record.setVerbs(verbs);
    }

    static generateScoreFromNLang(sentiment, record){
        record.setScore(sentiment.score);
        record.setMagnitude(sentiment.magnitude);
    }

    static processValues(record){
        let that = this;
        let text = record.description;
        logger.info("Text");
        logger.info(text);
        let promiseArray = [];
        promiseArray.push(this.analyzeEntities(text));
        promiseArray.push(this.analyzeSyntax(text));
        promiseArray.push(this.analyzeSentiment(text))
        return q.all(promiseArray)
            .then(function(arrayOfResults){
                for(var result in arrayOfResults){
                    if(arrayOfResults[result].entities){
                        that.generateEntitiesFromNLang(arrayOfResults[result].entities, record);
                    }else if(arrayOfResults[result].syntax){
                        that.generateSyntaxObjectFromNLang(arrayOfResults[result].syntax.tokens, record);
                    }else if(arrayOfResults[result].sentiment){
                        that.generateScoreFromNLang(arrayOfResults[result].sentiment, record);
                    }
                }
                return q.resolve(record);
            });
    }

    static processTestValues(record){
        let that = this;
        that.generateEntitiesFromNLang(testResult.entites, record);
        that.generateSyntaxObjectFromNLang(testResult.syntax.tokens, record);
        that.generateScoreFromNLang(testResult.sentiment, record);
        return q.resolve(record);
    }
}

module.exports = NaturalLanguageProcessService;