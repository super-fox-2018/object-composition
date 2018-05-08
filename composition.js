'use strict'


class Ingredient {
    constructor(name, total) {
        this.name = name;
        this.total = total;
    }
}

class Cookie {
    constructor(name) {
        this.name = name;
        this.status = 'mentah';
        this.ingredients = ingredients;
        this.hasSugar = hasSugar;
    }

    bake() {
        this.status = 'selesai dimasak';
    }

    static create(option) {
        var cook = new Cookie();
        console.log((`${option} ${cook.status}`));
    }

}

class PeanutButter extends Cookie {
    constructor(name) {
        super(name);
        this.peanut_count = 100;
    }
}

class ChocolateChip extends Cookie {
    constructor(name) {
        super(name);
        this.choc_chip_count = 200;
    }
}

class OtherCookie extends Cookie {
    constructor(name) {
        super(name);
        this.other_count = 150;
    }
}

class CookieFactory {
    constructor() {
    }

    static create(option, cookie) {
        let listCookie = [];
        let cook = null;

        for(let i = 0; i < cookie.length; i++) {
            if(cookie[i] == 'peanut butter') {
                cks = new PeanutButter(cookie[i]);
            } else if(cookie[i] == 'chocolate chip') {
                cks = new ChocolateChip(cookie[i]);
            } else if(cookie[i] == 'chocolate cheese') {
                cks = new OtherCookie(cookie[i]);
            } else if(cookie[i] == 'chocolate butter') {
                cks = new OtherCookie(cookie[i]);
            }
            listCookie.push(cook);
        }

        let ingredient;
        for(let i = 0; i < option.length; i++) {
            option[i] = option[i].split(' = ');
            for(let j = 0; j < listCookie.length; j++) {
                if(listCookie[i].name == option[i][0]) {
                    listCookie[i].ingredient = this.getIngredients(option[i][1]);
                    listCookie[i].hasSugar = this.checkSugar(listCookie[j].ingredient);
                }
            }
        }
        return listCookie;
    }

    static getIngredients(ingredient) {
        let ingredientArr = ingredient.split(', ');
        let ingredientObj = [];
        let name;
        let ammount;
        for(let i = 0; i < ingredientArr.length; i++) {
            ingredientArr[i] = ingredientArr[i].split(' : ');
            name = ingredientArr[i][1];
            ammount = ingredientArr[i][0];
            ingredientObj.push(new Ingredient(name, amount));
        }
        return ingredientObj;
    }

    static checkSugar(ingredient) {
        for(let i = 0; i < ingredient.length; i++) {
            if(ingredient[i].name == 'sugar') {
                return true;
            } else {
                return false;
            }
        }
    }

    static cookieRecommend(day, batch) {
        let noSugarCookie = [];
        if(day == 'tuesday') {
            for(let i = 0; i < batch.length; i++) {
                let cookie = batch[i];
                if(cookie.hasSugar == false) {
                    noSugarCookie.push(cookie);
                }
            }
        }
        return noSugarCookie;
    }
}

const fs = require('fs');
const option = fs.readFileSync('ingredient.txt', 'utf8').split('\n');
const cookie = fs.readFileSync('cookies.txt', 'utf8').split('\n');

let batchOfCookie = CookieFactory.create(cookie, option);
for(let i = 0; i < batchOfCookie.length; i++) {
    console.log(batchOfCookie[i]);
}

let noSugarCookie = CookieFactory.cookieRecommend('tuesday', batchOfCookie);
for(let i = 0; i < noSugarCookie.length; i++) {
    console.log(noSugarCookie[i]);
}
console.log(`sugar free cookie are : ${noSugarCookie}`)

console.log(cookie);