"use strict"

const fs = require('fs');

class Cookie {
  constructor(name, ingredients) {
    this.name = name;
    this.ingredients = ingredients;  // array of objects
    this.has_sugar = null;
    this.status = "mentah";
  }

  bake() {
    this.status = "selesai dimasak";
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients);
    this.peanut_count = 100;
  }
}

class ChocoChip extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients);
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients);
    this.other_count = 150;
  }
}

// mengirimkan list bahan ke dalam class cookie
class Ingredient {
  // store resep -> nama bahan dan jumlah
  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
  }
}

class CookieFactory {
  static create(options, recipes) {
    let optionsParser = fs.readFileSync(options, 'utf8').split('\n');
    let recipesParser = fs.readFileSync(recipes, 'utf8').split('\n');
    
    let wholeIngredients = [];
    for (let i = 0; i < recipesParser.length; i++) {
      let arr = recipesParser[i].split(' = ');
      wholeIngredients.push(arr[1]);
    }
    
    let cookieList = [];
    for (let i = 0; i < optionsParser.length; i++) {
      // Composition method
      if (optionsParser[i] === 'peanut butter') {
        cookieList.push(new PeanutButter(optionsParser[i], this.getIngredients(wholeIngredients[i])));
      } else if (optionsParser[i] === 'chocolate chip') {
        cookieList.push(new ChocoChip(optionsParser[i], this.getIngredients(wholeIngredients[i])));
      } else {
        cookieList.push(new OtherCookie(optionsParser[i], this.getIngredients(wholeIngredients[i])));
      }
    }
      console.log(cookieList[0].ingredients.length);
    // check sugar & bake
    for (let i = 0; i < cookieList.length; i++) {
      cookieList[i].bake();
      this.checkSugar(cookieList[i]);
    }

    // console.log(wholeIngredients)
    // console.log(this.getIngredients(wholeIngredients[0]));
    return cookieList;
  }
  
  static getIngredients(data) {
    let ingredientsList = []
    let ingredients = data.split(', ');

    for (let i = 0; i < ingredients.length; i++) {
      let ingredientDetail = ingredients[i].split(' : ');
      let name = ingredientDetail[0];
      let amount = ingredientDetail[1];

      ingredientsList.push(new Ingredient(name, amount));
    }
    return ingredientsList; // returns array of Ingredient objects
  }

  static checkSugar(cookieList) {
    let len = cookieList.ingredients.length
    for (let j = 0; j < len ; j++) {
      if (cookieList.ingredients[j].name === 'sugar') {
        cookieList.has_sugar = true;
        break;
      }
      cookieList.has_sugar = false;
    }
  }

  static cookieRecommendation(day, object) {
    for (let i = 0; i < object.length; i++) {
      if (object[i].has_sugar) {
        return `${day}: ${object[i].name} cookie`;
      }
    }
  }
}

// dapatkan list kue dari cookies.txt, simpan ke var options,
// buat dalam method create

// contoh driver code
let options = 'cookies.txt';
let recipes = 'recipes.txt';
let batchOfCookies = CookieFactory.create(options, recipes);
// console.log(batchOfCookies[0]); // array of objects
console.log(batchOfCookies);

let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batchOfCookies);
console.log("sugar free cakes are :");
console.log(sugarFreeFoods)
