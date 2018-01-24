let name = "Filip";
let name2 = name;
name2 = "Terka";
console.log(name, name2); // Filip, Terka


const friends = ["Sara", "Terka", "Adam"];
const people = friends;
people[3] = "Tom";
    
console.log(friends, people) // both are updated
    
    
// create copy
let copy = [...friends];
let copy2 = [].concat(friends);
let copy3 = friends.slice();
let copy4 = Array.from(friends);

    

const P = {
    name: "Filip",
    age: 18
}

/*
const me = P;
me.age = 17; // changed the original object too !!!!
 */   
    
// make a copy
let c = Object.assign({}, P, {name: "Terka", age: 17});
console.log(copy);
    
// or like this
let cv = Object.assign({}, P);
let ca = JSON.parse(JSON.stringify(cv));
ca.age = 23; // above object still intact
    

