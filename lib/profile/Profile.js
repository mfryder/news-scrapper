class Profile {
    constructor(name, url, biasMap, nounCount, verbCount, adjCount, positivity){
        this.name = name;
        this.url = url;
        this.biasMap = biasMap;
        this.nounCount = nounCount;
        this.verbCount = verbCount;
        this.adjCount = adjCount;
        this.positivity = positivity;
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

    getUrl(){
        return this.url;
    }

    setUrl(url){
        this.url = url;
    }

    getBiasMap(){
        return this.biasMap;
    }

    setBiasMap(biasMap){
        let array = [];
        if(biasMap.constructor === Object){
            for(var item in biasMap){
                array.push({name: item, bias: biasMap[item]});
            }
        }
        this.biasMap = array;
    }

    getNounCount(){
        return this.nounCount;
    }

    setNounCount(nounCount){
        let array = [];
        if(nounCount.constructor === Object){
            
            for(var item in nounCount){
                array.push({name: item, count: nounCount[item]});
            }
        }
        this.nounCount = array;
    }

    getVerbCount(){
        return this.verbCount;
    }

    setVerbCount(verbCount){
        let array = [];
        if(verbCount.constructor === Object){
            for(var item in verbCount){
                array.push({name: item, count: verbCount[item]});
            }
        }
        this.verbCount = array;
    }

    getAdjCount(){
        return this.adjCount;
    }

    setAdjCount(adjCount){
        let array = [];
        if(adjCount.constructor === Object){
            for(var item in adjCount){
                array.push({name: item, count: adjCount[item]});
            }
        }
        this.adjCount = array;
    }

    getPositivity(){
        return this.positivity;
    }

    setPositivity(positivity){
        this.positivity = positivity;
    }
}
module.exports = Profile;