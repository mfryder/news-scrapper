const assert = require('assert');
const chai    = require("chai");
const chaiAsPromised = require("chai-as-promised")
const expect = chai.expect;
chai.use(chaiAsPromised);
const proxyquire = require("proxyquire");

const NaturalLanguageProcessService = require("../lib/NaturalLanguageProcessService");
const Record = require("../lib/records/Record");
const testNLObjects = require('./config/examples/naturalLanguageProcessingResult.json');
const testResults = require("./config/examples/testResults.json");
const q = require("q");

const NaturalLanguageProcessServiceMock = proxyquire('../lib/NaturalLanguageProcessService',{
    '@google-cloud/language': 
        function(){
            return {
                analyzeEntities: function(document){
                    return q.resolve([{entities: "entity"}]);
                },
                analyzeSyntax: function(document){
                    return q.resolve(["syntax"])
                },
                analyzeSentiment: function(document){
                    return q.resolve([{documentSentiment: "sentiment"}])
                }
            }
        }
});

describe('Natural Language Process Service Tests', function() {
  describe('generateEntitiesFromNLang Test', function() {
    it('should successfully parse entities', function() {
        let record = new Record();
        const nLangEntities = testNLObjects.entites;
        NaturalLanguageProcessService.generateEntitiesFromNLang(nLangEntities,record);
        expect(record.getEntities().length).to.equal(testResults.entites.length);
    });
  });
  describe('generateSyntaxObjectFromNLang Test', function() {
    it('should successfully parse tokens', function() {
        let record = new Record();
        const nLangTokens = testNLObjects.syntax.tokens;
        NaturalLanguageProcessService.generateSyntaxObjectFromNLang(nLangTokens,record);
        expect(record.getNouns().length).to.equal(testResults.nouns.length);
        expect(record.getVerbs().length).to.equal(testResults.verbs.length);
        expect(record.getAdj().length).to.equal(testResults.adj.length);
    });
  });
  describe('generateScoreFromNLang Test', function() {
    it('should successfully parse sentiment', function() {
        let record = new Record();
        const nLangSentiment = testNLObjects.sentiment;
        NaturalLanguageProcessService.generateScoreFromNLang(nLangSentiment,record);
        expect(record.getScore()).to.equal(testResults.score);
        expect(record.getMagnitude()).to.equal(testResults.magnitude);
    });
  });
  describe('analyzeEntities Test', function() {
    it('should successfully pull entities', function(done) {
        var text = "test";
        expect(NaturalLanguageProcessServiceMock.analyzeEntities(text)).to.eventually.be.fulfilled.and.haveOwnProperty("entities").notify(done);
    });
  });
  describe('analyzeSyntax Test', function() {
    it('should successfully pull syntax', function(done) {
        var text = "test";
        expect(NaturalLanguageProcessServiceMock.analyzeSyntax(text)).to.eventually.be.fulfilled.and.haveOwnProperty("syntax").notify(done);
    });
  });
  describe('analyzeSentiment Test', function() {
    it('should successfully pull sentiment', function(done) {
        var text = "test";
        expect(NaturalLanguageProcessServiceMock.analyzeSentiment(text)).to.eventually.be.fulfilled.and.haveOwnProperty("sentiment").notify(done);
    });
  });
});