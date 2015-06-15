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
        var returnPeople = [];
        if (active) {
            return this.returnActive();
        }
        return this.People.sort(function(a, b) {
            return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
        });
    }
    this.returnActive = function() {
        var returnPeople = [];
        for (var i in this.People) {
            if (this.People[i].active) {
                returnPeople.push(this.People[i]);
            }
        }
        return returnPeople;
    }
    this.getPerson = function(personName) {
        for (var i in this.People) {
            if (this.People[i].name == personName) {
                return this.People[i];
            }
        }
    }
    this.getThings = function(){
        return this.Thing.sort(function(a, b) {
            return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
        });
    }
    this.getThing = function(thingName){
        for (var i in this.Thing){
            if(this.Thing[i].name == thingName){
                return this.Thing[i];
            }
        }
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
        var returnPeople = [];
        for(var i in this.People){
            if(this.People[i].hasThing(thingName)){
                returnPeople.push(this.People[i]);
            }
        }
        return returnPeople;
    }
    this.getPeopleWhoOwnNothing = function(){
        var returnPeople = [];
        for(var i in this.People){
            if(0 == this.People[i].things.length){
                returnPeople.push(this.People[i]);
            }
        }
        return returnPeople;
    }
    this.getThingsNotOwned = function(){
        var returnThings = [];
        for(var i in this.Thing){
            if(typeof this.Thing[i].numberOwned == "undefined"){
                returnThings.push(this.Thing[i]);
            }
        }
        return returnThings;
    }
    this.getThingsOwned = function(){
        var returnThings = [];
        for(var i in this.Thing ){
            if(this.Thing[i].numberOwned > 0){
                returnThings.push(this.Thing[i]);
            }
        }
        return returnThings;
    }
}