"use strict"

class Cookie{
  constructor(name, options, arr_ingredients){
    this._name = name;
    this._status = "raw";
    this._options = options;
    this._ingredient = arr_ingredients;
  }
  bake(){
    this._status = "cooked";
  }
}

class OtherCookie extends Cookie{
  constructor(name, options, arr_ingredients){
    super(name, options, arr_ingredients );
    this._other_count = 150;

  }
  get count(){
    return this._other_count;
  }


}
class PeanutButter extends Cookie{
  constructor(name, options, arr_ingredients){

    super(name, options, arr_ingredients);
    this._peanut_count = 100;
  }
  get count(){
    return this._peanut_count;
  }

}


class ChocolateChip extends Cookie{
  constructor(name, options, arr_ingredients){
    super(name, options, arr_ingredients);
    this._choc_chip_count = 200;

  }
  get count(){
    return this._choc_chip_count;
  }


}

class CookieFactory {
  constructor(options){
  }
  static create(options){
    var arr = [];

    for(let i = 0; i < options.length; i++){
      if(options[i][0].toString() === "peanut butter"){
        //misahin mana nama, mana ingredients
        let all_ingredients = options[i][1];
        let arr_ingredients = CookieFactory.splitIngredients(all_ingredients, options[i][0])
        let pb  = new PeanutButter(options[i][0], options, arr_ingredients);
        pb.bake()
        arr.push(pb);
      }
      else if(options[i][0].toString() === "chocolate chip"){
        let all_ingredients = options[i][1];
        let arr_ingredients = CookieFactory.splitIngredients(all_ingredients, options[i][0])
        let cc = new ChocolateChip(options[i][0], options, arr_ingredients);
        cc.bake();
        arr.push(cc);
      }
      else {
        let all_ingredients = options[i][1];
        let arr_ingredients = CookieFactory.splitIngredients(all_ingredients, options[i][0])
        let other = new OtherCookie(options[i][0], options, arr_ingredients);
        other.bake();
        arr.push(other);
      }
    }
    
    return arr;
  }

  static splitIngredients(all_ingredients, cookieName) {
    var arr = [];
    all_ingredients = all_ingredients.split(",")


    for(let i = 0; i < all_ingredients.length; i++){
      all_ingredients[i] = all_ingredients[i].split(": ");
    }
    for(let i = 0; i < all_ingredients.length; i++){
      arr.push({
        name: all_ingredients[i][1],
        amount: all_ingredients[i][0],
      });
    }

    return arr;
  }

  static checkSugar(all_ingredients, cookieName){
    var sugarFree = [];
    var isSugarFree = true;

    for(let i = 0; i < all_ingredients.length; i++){
      if(all_ingredients[i][1] === "sugar"){
        isSugarFree = false;
      }
    }

    if(isSugarFree){
      sugarFree.push(cookieName);
    }

    return sugarFree
  }
  static cookieRecommendation(day, cookieArr){
    var isSugarFree = true;
    var allCookie = [];
    var notSugarFree = [];

    for(let i = 0; i < cookieArr.length; i++){
      let cookieIng = cookieArr[i]._ingredient;
      for(let k = 0; k < cookieIng.length; k++){
        if(cookieIng[k].name === "sugar"){
          isSugarFree = false;
          notSugarFree.push(cookieArr[i]._name);
        }
      }

      allCookie.push(cookieArr[i]._name);
    }

    for(let i = 0; i < allCookie.length;i++){
      for(let k = 0; k < notSugarFree.length; k++){
        if(allCookie[i] === notSugarFree[k]){
          allCookie.splice(i,1);
        }
      }
    }

    return allCookie;
  }


}


var fs = require('fs')
var options = fs.readFileSync('cookies.txt', 'utf8');
options =  options.split("\n");

for(let i = 0; i < options.length; i++){
  options[i] =  options[i].split(" =");
}

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);


let sugarFree = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);

if(sugarFree.length === 1){
  console.log("One sugar-free cookies available: " + sugarFree);
}
else if (sugarFree.length === 0){
  console.log("No sugar free cookies available :(");
}
else{
  console.log("These are the available sugar-free cookies :")
  for(let i = 0; i < sugarFree.length; i++){
    console.log("- " + sugarFree[i]);
  }
}
