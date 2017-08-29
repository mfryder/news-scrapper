const mongoose = require('mongoose');
const Profiles = mongoose.model("Profiles");
const AbstractCollection = require("./AbstractCollection");
const logger = require('winston');
const q = require('q');

class ProfilesCollection extends AbstractCollection{
    static store(profile){
        return Profiles.findOneAndUpdate({"name": profile.getName()}, profile, {"upsert": true}, function(err, doc){
            if(err){
                return q.reject(err);
            }   
            return q.resolve(doc);
        });
    }

    static findAll(){
        return Profiles.find();
    }

    static findByType(type){
        return Profile.find({"name": type})
            .then(function returnedResults(results){
                return q.resolve(JSON.parse(JSON.stringify(results)));
            });
    }
}

module.exports = ProfilesCollection;