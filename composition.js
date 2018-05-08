class Cookie {
  constructor(name) {
    this.name = name;
    this.status = 'raw';
    this.ingredients = [];
    this.hasSugar = false;
  }

  bake() {
    this.status = 'cooked';
  }

  createIngredients() {
    let list = this.list;
    let ingredients = [];
    for (let i = 0; i < list.length; i++) {
      ingredient = list[i].split(',');
      ingredients.push(new Ingredient(list[i].split(',')));
    }
    return ingredients;
  }
}

class PeanutButter extends Cookie {
  constructor(name) {
    super(name);
    this.peanutCount = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name) {
    super(name);
    this.chocChipCount = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super(name);
    this.otherCount = 150;
  }
}

class Ingredient {
  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
  }
}

class CookieFactory {
  constructor() {}
  static create(cookieOptions, ingredientsString) {
    let listOfCookies = [];
    let cookie = null;
    // idx 0 = peanut butter, idx 1 = chocolate chip, idx 2 = chocolate cheese, idx 3 = chocolate butter
    for (let i = 0; i < cookieOptions.length; i++) {
      if (cookieOptions[i] === 'peanut butter') {
        cookie = new PeanutButter(cookieOptions[i]);
      } else if (cookieOptions[i] === 'chocolate chip') {
        cookie = new ChocolateChip(cookieOptions[i]);
      } else if (cookieOptions[i] === 'chocolate cheese') {
        cookie = new OtherCookie(cookieOptions[i]);
      } else if (cookieOptions[i] === 'chocolate butter') {
        cookie = new OtherCookie(cookieOptions[i]);
      }
      cookie.bake(); // bake first before selling
      listOfCookies.push(cookie);
    }
    let ingredients;
    for (let i = 0; i < ingredientsString.length; i++) {
      ingredientsString[i] = ingredientsString[i].split(' = '); // index 0 =  cookies name, index 1 = ingredients
      for (let k = 0; k < listOfCookies.length; k++) {
        if (listOfCookies[k].name === ingredientsString[i][0]) {
          listOfCookies[k].ingredients = this.getIngredients(ingredientsString[i][1]);
          listOfCookies[k].hasSugar = this.checkForSugar(listOfCookies[k].ingredients);
        }
      }
    }
    return listOfCookies;
  }

  static getIngredients(ingredients) {
    let ingredientsArray = ingredients.split(', ');
    let ingredientsObjects = [];
    let name;
    let amount;
    for (let i = 0; i < ingredientsArray.length; i++) {
      ingredientsArray[i] = ingredientsArray[i].split(' : '); // split ingredient with amount
      name = ingredientsArray[i][1];
      amount = ingredientsArray[i][0];
      ingredientsObjects.push(new Ingredient(name, amount));
    }
    return ingredientsObjects;
  }

  static checkForSugar(ingredients) {
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredients[i].name === 'sugar') {
        return true;
      }
    }
    return false;
  }

  static cookieRecommendation(day, batch) {
    let sugarFreeCookies = [];
    if (day === 'tuesday') {
      for (let i = 0; i < batch.length; i++) {
        let cookie = batch[i];
        if (cookie.hasSugar === false) {
          sugarFreeCookies.push(cookie);
        }
      }
    }
    return sugarFreeCookies;
  }

}

const fs = require('fs');
const cookieOptions = fs.readFileSync('cookies.txt', 'utf8').split('\n');
const ingredientsString = fs.readFileSync('ingredients.txt', 'utf8').split('\n');

let batchOfCookies = CookieFactory.create(cookieOptions, ingredientsString);
for (let i = 0; i < batchOfCookies.length; i++) {
  console.log(batchOfCookies[i]);
}

let sugarFreeCookies = CookieFactory.cookieRecommendation('tuesday', batchOfCookies);
console.log('YOU GET FREE NO SUGAR COOKIES TODAY :happy:')
for (let i = 0; i < sugarFreeCookies.length; i++) {
  console.log(sugarFreeCookies[i]);
}
