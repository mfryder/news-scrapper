

class Record {
    constructor(title, description, source, author, score, magnitude, nouns, verbs, adj, entities, date){
        this.title = title;
        this.description = description;
        this.source = source;
        this.author = author;
        this.score = score;
        this.magnitude = magnitude;
        this.nouns = nouns;
        this.verbs = verbs;
        this.adj = adj;
        this.entities = entities;
        this.date = date;
    }

    getTitle(){
        return this.title;
    }

    setTitle(title){
        this.title = title;
    }

    getDescription(){
        return this.description;
    }

    setDescription(description){
        this.description = description;
    }

    getSource(){
        return this.source;
    }

    setSource(source){
        this.source = source;
    }

    getAuthor(){
        return this.author;
    }

    setAuthor(author){
        this.author = author;
    }

    getScore(){
        return this.score;
    }

    setScore(score){
        this.score = score;
    }

    getMagnitude(){
        return this.magnitude
    }

    setMagnitude(magnitude){
        this.magnitude = magnitude;
    }

    getNouns(){
        return this.nouns;
    }

    setNouns(nouns){
        this.nouns = nouns;
    }

    getVerbs(){
        return this.verbs;
    }

    setVerbs(verbs){
        this.verbs = verbs;
    }

    getAdj(){
        return this.adj;
    }

    setAdj(adj){
        this.adj = adj;
    }

    getEntities(){
        return this.entities;
    }

    setEntities(entities){
        this.entities = entities;
    }

    getDate(){
        return this.date;
    }

    setDate(date){
        this.date = date;
    }

}
module.exports = Record