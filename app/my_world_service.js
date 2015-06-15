function Thing(args) {
    this.name = args.name;
    this.numberInStock = args.numberInStock;
    this.numberOwned = args.numberOwned;
    this.available = function(){
        if(this.numberInStock <= 0){
            return false;
        }
        return true;
    }
    this.isOwned = function(){
        if(this.numberOwned > 0){
            return true;
        }
        return false;
    }
};

function Person(args) {
    this.name = args.name;
    this.active = args.active;
    if( typeof args.things == "undefined"){
        this.things = [];
    }else{
        this.things = args.things;
    }
    this.hasThing = function(thingName){
        for(var i in this.things){
            if(this.things[i] == thingName){
                return true;
            }
        }
        return false;
    }
    this.removeThing = function(thingName){
        for(var i in this.things){
            if(this.things[i] == thingName){
                delete(this.things[i]);
                return true;
            }
        }
        return false;
    }
};

function MyWorldService(People, Thing) {
    this.Thing = Thing;
    this.People = People;
    this.getPeople = function(active) {
        if (active) {
            return _.sortBy(_.filter(this.People, function(people){return people.active == true}), "name");
        }
        return _.sortBy(this.People,"name");
    }
    this.getPerson = function(personName) {
        return _.find(this.People, function(person){return person.name == personName});
    }
    this.getThings = function(){
        return _.sortBy(this.Thing, "name");
    }
    this.getThing = function(thingName){
        return _.find(this.Thing, function(thing){return thing.name == thingName});
    }
    this.acquireThing = function(personName, thingName){
        var person = this.getPerson(personName);
        var thing = this.getThing(thingName);
        if(thing.available())
        {
            person.things.push(thing.name);
            thing.numberInStock -- ;
            thing.numberOwned ++;
            return true;
        }else{
            throw ("No more things left");
        }
    }
    this.returnThing = function(personName, thingName){
        var person = this.getPerson(personName);
        var thing = this.getThing(thingName);
        if(!person.removeThing(thingName)){
            throw ("Removing thing not owned");
        }
        thing.numberInStock ++;
        thing.numberOwned --;
        return true;
    }
    this.getPeopleWhoOwnThing = function(thingName){
        return _.filter(this.People, function(person){ return person.hasThing(thingName);});
    }
    this.getPeopleWhoOwnNothing = function(){
        return _.filter(this.People, function(person){ return person.things.length == 0;});
    }
    this.getThingsNotOwned = function(){
        return _.filter(this.Thing, function(thing){ return typeof thing.numberOwned == "undefined";});
    }
    this.getThingsOwned = function(){
        return _.filter(this.Thing, function(thing){return thing.numberOwned > 0});
    }
}