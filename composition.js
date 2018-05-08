class Cookie {
    constructor(name, ingredients, isSugar) {
        this.name = name
        this.status = "mentah"
        this.ingredients = ingredients
        this.hasSugar = isSugar
    }
    bake() {
        this.status = "selesai dimasak"
    }
}
class PeanutButter extends Cookie {
    constructor(name, ingredients, isSugar) {
        super(name, ingredients, isSugar)
        this.peanutCount = 100;
    }
}

class ChocholateChip extends Cookie {
    constructor(name, ingredients, isSugar) {
        super(name, ingredients, isSugar)
        this.chocChipCcount = 200
    }
}

class ChocolateChipCrumbled extends Cookie {
    constructor(name, ingredients, isSugar) {
        super(name, ingredients, isSugar)
        this.chocChipCcount = 210
    }
}

class OtherCookies extends Cookie {
    constructor(name, ingredients, isSugar) {
        super(name, ingredients, isSugar)
        this.otherCount = 150
    }
}

class CookieFactory {
    static create(cookies) {
        let arrObj = [];

        //ingredient 
        let fs2 = require('fs');
        let string = fs2.readFileSync('options.txt', 'utf8').split('\n');
        let arrAllIng = [];
        for (let i = 0; i < string.length; i++) {
            let objOpt = {}
            objOpt.name = string[i].split('=')[0].trim()
            let arrIng = string[i].split('=')[1].trim().split(',')
            let arrIngredient = [];
            let hasSugar = false;
            for (let j = 0; j < arrIng.length; j++) {
                let objIng = {}
                objIng.name = arrIng[j].split(':')[1].trim();
                objIng.amount = arrIng[j].split(':')[0].trim();
                if (objIng.name.trim() !== 'sugar' && !hasSugar) {
                    objOpt.isSugar = false
                } else {
                    objOpt.isSugar = true
                    hasSugar = true;
                }
                arrIngredient.push(objIng);
            }
            objOpt.ingredients = arrIngredient;
            arrAllIng.push(objOpt);
        }

        // create cookies
        for (let i = 0; i < cookies.length; i++) {
            // create ingridients
            let arrIngredient = []
            for (let j = 0; j < arrAllIng[i].ingredients.length; j++) {
                let ingredients = new Ingredient(arrAllIng[i].ingredients[j])
                arrIngredient.push(ingredients)
            }

            if (cookies[i] === 'peanut butter' && arrAllIng[i].name === 'peanut butter') {
                // console.log(arrIngredient)

                let peanut = new PeanutButter(cookies[i], arrIngredient, arrAllIng[i].isSugar)
                arrObj.push(peanut);
            }
            else if (cookies[i] === 'chocolate chip') {
                let chip = new ChocholateChip(cookies[i], arrIngredient, arrAllIng[i].isSugar)
                arrObj.push(chip);
            } else {
                let other = new OtherCookies(cookies[i], arrIngredient, arrAllIng[i].isSugar)
                arrObj.push(other);
            }
        }
        return arrObj
    }

    static cookieRecommendation(day, arrObj) {
        let noSugar = [];
        for (let i = 0; i < arrObj.length; i++) {
            if (!arrObj[i].hasSugar) {
                noSugar.push(arrObj[i])
            }
        }
        return noSugar;
    }
}

class Ingredient {
    constructor(options) {
        this.name = options['name']
        this.amount = options['amount']
    }
}

let fs1 = require('fs');
let cookies = fs1.readFileSync('cookies.txt', 'utf8').split('\n');


let batchOfCookies = CookieFactory.create(cookies);
console.log(batchOfCookies);


let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batchOfCookies);
console.log("sugar free cakes are: ");
for (let i = 0; i < sugarFreeFoods.length; i++) {
    console.log(sugarFreeFoods[i].name);
}

// Cookie {
//     name: Peanut Butter 
//     ingredients: [
//         Ingredient { name: , amount},
//         Ingredient { name: , amount},
//         Ingredient { name: , amount},
//         Ingredient { name: , amount},
//     ]
// }

