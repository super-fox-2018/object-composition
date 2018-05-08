const fs = require('fs');

class ClassName {
  constructor() {

  }
}

class Cookie {
  constructor(name) {
    this.name = name;
    this.status = 'mentah';
    this.ingredients = [];

  }
  bake(){
    this.status = 'selesai dimasak';
  }
}
class PeanutButter extends Cookie {
  constructor(ingredients) {
    super(ingredients);
    this.peanut_count = 100;
  }
}
class ChocolateChip extends Cookie {
  constructor(ingredients) {
    super(ingredients);
    this.choc_chip_count = 200;
  }
}
class OtherCookie extends Cookie {
  constructor(ingredients) {
    super(ingredients);
    this.other_cookies = 150;
  }
}

class CookieFactory{
  static create(options){
    var listOfCookies = [];
    for (var i = 0; i < options.length-1; i++) {
      if(options[i]=='peanut butter'){
        var peanutButter = new PeanutButter;
        var cookie = new Cookie;
        peanutButter.ingredients = cookie.ingredients;
        peanutButter.name = options[i];
        listOfCookies.push(peanutButter);
      }
      else if (options[i]=='chocolate chip') {
        var chocolateChip = new ChocolateChip;
        var cookie = new Cookie;
        chocolateChip.ingredients = cookie.ingredients;
        chocolateChip.name = options[i];
        listOfCookies.push(chocolateChip);
      }
      else {
        var otherCookies = new OtherCookie;
        var cookie = new Cookie;
        otherCookies.ingredients = cookie.ingredients;
        otherCookies.name = options[i];
        listOfCookies.push(otherCookies);
      }
    }
    return listOfCookies;
  }
}


var options = fs.readFileSync('cookies.txt','utf8').split('\n');
// console.log(option);
var CookieFact = new CookieFactory;
CookieFactory.create(options);
let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);
var cook = new Cookie;
// console.log(cook);
