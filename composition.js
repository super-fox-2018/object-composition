"use strict"

const fs = require('fs');

class Ingredient {
  constructor(options) {
    this.name = options.name;
    this.amount = options.amount;
  }
}

class Cookie {
  constructor(name, ingredients, hasSugar) {
    this.name = name;
    this.status = "Raw";
    this.ingredients = ingredients;
    this.hasSugar = hasSugar;
  }

  bake() {
    this.status = "Cooked";
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients, hasSugar) {
    super(name, ingredients, hasSugar);
    this.peanutCount = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredients, hasSugar) {
    super(name, ingredients, hasSugar);
    this.chocChipCount = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredients, hasSugar) {
    super(name, ingredients, hasSugar);
    this.otherCount = 150;
  }
}

class CookieFactory {
  static create(options) {
    const recipe = CookieFactory.generateRecipe(options);
    const cookies = [];
    for (let i = 0; i < recipe.length; i += 1) {
      let cookie = undefined;
      const ingredients = [];
      let hasSugar = false;
      const ingredientList = recipe[i].ingredients;
      for (let j = 0; j < ingredientList.length; j += 1) {
        const ingredient = ingredientList[j];
        if (ingredient.name === 'sugar') hasSugar = true;
        ingredients.push(new Ingredient(ingredient));
      }
      const cookiesName = recipe[i].name;
      switch(cookiesName) {
        case 'peanut butter':
          cookie = new PeanutButter(cookiesName, ingredients, hasSugar);
          break;
        case 'chocolate chip':
          cookie = new ChocolateChip(cookiesName, ingredients, hasSugar);
          break;
        default:
          cookie = new OtherCookie(cookiesName, ingredients, hasSugar);
          break;
      }
      cookies.push(cookie);
    }
    return cookies;
  }

  static generateRecipe(options) {
    const recipe = [];
    for (let i = 0; i < options.length; i += 1) {
      const obj = {};
      const currentInput = options[i].split(' = ');
      obj.name = currentInput[0];
      const ingredientList = currentInput[1].split(', ');
      obj.ingredients = [];
      for (let j = 0; j < ingredientList.length; j += 1) {
        const ingredient = ingredientList[j].split(' : ');
        const name = ingredient[0];
        const amount = ingredient[1];
        
        obj.ingredients.push({ name, amount });
      }
      recipe.push(obj);
    }
    return recipe;
  }

  static cookieRecommendation(day, cookies) {
    if (day !== 'tuesday') return cookies;
    const recommendedCookies = [];
    for (let i = 0; i < cookies.length; i += 1) {
      if (!cookies[i].hasSugar) {        
        recommendedCookies.push(cookies[i]);
      }
    }
    return recommendedCookies;
  }
}

const options = fs.readFileSync('cookies.txt', 'utf8').split('\n');
let batchOfCookies = CookieFactory.create(options);
console.log(batchOfCookies);
const sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batchOfCookies);
console.log('Sugar free cookies are :');
for (let i = 0; i < sugarFreeFoods.length; i += 1) {
  console.log(sugarFreeFoods[i].name);
}