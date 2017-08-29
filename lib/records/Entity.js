class Entity {
    
    constructor(name, entityType, salience){
        this.name = name;
        this.entityType = entityType;
        this.salience = salience;
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

    getEntityType(){
        return this.entityType;
    }

    setEntityType(entityType){
        this.entityType = entityType;
    }
    
    getSalience(){
        return this.salience;
    }

    setSalience(salience){
        this.salience = salience;
    }
}
module.exports = Entity;