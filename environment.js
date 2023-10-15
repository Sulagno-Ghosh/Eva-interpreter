class Environment{

    constructor(record = {}, parent = null){
        this.record = record;
        this.parent = parent;
    }

    define(name,value){
        this.record[name] = value;
        return value;
    }
    
    lookup(name){
       return this.resolve(name).record[name];
    }

    //the resolve method doesn't seem to have a problem
    resolve(name){
        if(this.record.hasOwnProperty(name)){
            return this;
        }
        if(this.parent === null){
            throw new ReferenceError(`Variable "${name}" is not defined.`);
        }
        return this.parent.resolve(name);
    }
}

module.exports = Environment;