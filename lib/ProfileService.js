const q = require("q");
const Profile = require("./profile/Profile");
const Record = require("./records/Record");
const Entity = require("./records/Entity");
const RecordsCollectionService = require("./RecordsCollectionService");
const ProfilesCollection = require("./data/mongo/collections/ProfilesCollection");
const ErrorMessageFactory = require("./errors/ErrorFactory");
const logger = require('winston');
const _ = require("lodash");
const socketClient = require("./socket/socketClient");
const socketMessageTypeEnum = require("./enum/SocketMessageTypeEnumeration");

class ProfileService{
    static findAll(){
        return ProfilesCollection.findAll()
            .then(function success(resultArray){
                return q.resolve(resultArray);
            })
            .catch(function error(error){
                let errMsg = ErrorMessageFactory.createError(error);
                errMsg.setStack(error.stack);
                errMsg.setMessage(error.message);
                return q.reject(errMsg);
            })
    }

    static findByType(type){
        return ProfilesCollection.findByType(type)
            .then(function success(resultArray){
                return q.resolve(resultArray);
            })
            .catch(function error(error){
                let errMsg = ErrorMessageFactory.createError(error);
                errMsg.setStack(error.stack);
                errMsg.setMessage(error.message);
                return q.reject(errMsg);
            });
    }

    static reCalculateProfile(type){
        let that = this;
        return RecordsCollectionService.findByType(type)
            .then(function loadedResults(results){
                if(results.length > 0){
                    let records = [];
                    for(let idx in results){
                        let result = results[idx];
                        let entities = [];
                        let parsedEntities = JSON.parse(JSON.stringify(result.entities));
                        for(let jdx in parsedEntities){
                            let entityItem = parsedEntities[jdx];
                            let entity = new Entity(entityItem.name, entityItem.entityType, entityItem.salience);
                            entities.push(entity);
                        } 
                        let nouns = JSON.parse(JSON.stringify(result.nouns));
                        let verbs = JSON.parse(JSON.stringify(result.verbs));
                        let adj = JSON.parse(JSON.stringify(result.adj));
                        let record = new Record(result.title, result.description, result.source, result.author,
                            result.score, result.magnitude, nouns, verbs, adj, entities, result.date);
                        records.push(record);
                    }
                    return that.calculateProfile(records);
                }else{
                    return q.resolve([]);
                }
            })
            .catch(function error(error){
                let errMsg = ErrorMessageFactory.createError(error);
                errMsg.setStack(error.stack);
                errMsg.setMessage(error.message);
                return q.reject(errMsg);
            })
    }

    static calculateSentimentVsEntities(records, newProfile){
        let wordMap = {};
        for(let idx in records){
            let record = records[idx];
            for(let jdx in record.getEntities()){
                let entity = record.getEntities()[jdx];
                if(!wordMap[entity.name]){
                    wordMap[entity.name] = [];
                }
                wordMap[entity.name].push(record.getScore());
            }
        }
        for(let name in wordMap){
            let mean =_.meanBy(wordMap[name]);
            wordMap[name] = mean;
            
        }
       
        newProfile.setBiasMap(wordMap);
    }

    static calculateMostUsedWordTypes(records, newProfile){
        let wordMap = {
            nouns: {},
            verbs: {},
            adj: {}
        };
        for(let idx in records){
            let record = records[idx];
            if(record.nouns && record.nouns.length > 0){
                for(let jdx in record.nouns){
                    if(record.nouns.hasOwnProperty(jdx)){
                        let noun = record.nouns[jdx];
                        if(noun && noun.constructor === String){
                            if(wordMap.nouns[noun]){
                                wordMap.nouns[noun] += 1;
                            }else{
                                wordMap.nouns[noun] = 1;
                            }
                        }
                    }
                }
            }
            if(record.verbs && record.verbs.length > 0){
                for(let kdx in record.verbs){
                    if(record.verbs.hasOwnProperty(kdx)){
                        let verb = record.verbs[kdx];
                        if(verb && verb.constructor === String){
                            if(wordMap.verbs[verb]){
                                wordMap.verbs[verb] +=1;
                            }else{
                                wordMap.verbs[verb] = 1;
                            }
                        }
                    }
                }
            }
            if(record.adj && record.adj.length > 0){
                for(let ldx in record.adj){
                    if(record.adj.hasOwnProperty(ldx)){
                        let adj = record.adj[ldx];
                        if(adj && adj.constructor === String){
                            if(wordMap.adj[adj]){
                                wordMap.adj[adj] +=1;
                            }else{
                                wordMap.adj[adj] = 1;
                            }
                        }
                    }
                }
            }
        }
        newProfile.setNounCount(wordMap.nouns);
        newProfile.setVerbCount(wordMap.verbs);
        newProfile.setAdjCount(wordMap.adj);
    }

    static calculateOverallPositivity(records, newProfile){
        let score = 0;
        for(let idx in records){
            let record = records[idx];
            score += record.getScore();
        }
        score = score / records.length;
        newProfile.setPositivity(score);
    }

    static calculateProfile(records){
        let newProfile = new Profile();
        //find better way to set initial profile variables;
        newProfile.setName(records[0].source);
        newProfile.setUrl("");
        this.calculateSentimentVsEntities(records, newProfile);
        this.calculateMostUsedWordTypes(records, newProfile);
        this.calculateOverallPositivity(records, newProfile);
        socketClient.sendMessage(socketMessageTypeEnum.PROFILEUPDATE,{"msg": JSON.stringify(newProfile)});
        return ProfilesCollection.store(newProfile);
    }
}

module.exports = ProfileService;