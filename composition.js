const fs = require('fs')

class Cookie{
    constructor(){
        this.name = 'cookie'
        this.status = "mentah"
        this.ingredients = [];
    }
    
    bake(){
        this.status = "selesai dimasak"
    }

}

class PeanutButter extends Cookie{
    constructor(object){
        super(object)
        this.peanut_count = 100;
    }
}

class ChocolateChip extends Cookie{
    constructor(object){
        super(object)
        this.choc_chip_count = 200;
    }
}

class OtherCookie extends Cookie{
    constructor(object){
        super(object)
        this.other_count = 150;
    }
}
class Ingredients{
    constructor(option){
        this.name = option['name']
        this.ammount = option['amount']  
    }

}
class CookieFactory{
    static create(ingredients){
        let list_cookies = []


     

        for(let a = 0; a < ingredients.length; a++) {
            let cookie_name = ingredients[a].split(' = ')[0]
            let listIngredients = ingredients[a].split(' = ')[1].split(', ')
            var theIngredients = [];
            for(let b = 0; b < listIngredients.length; b++){
                var detailIngredients = listIngredients[b].split(' : ');
                var nameIngredients = detailIngredients[1];
                var amountIngredients = detailIngredients[0];
                var newIngredients = new Ingredients({name : nameIngredients, amount : amountIngredients})
                theIngredients.push(newIngredients);
            }

            if(cookie_name == 'chocolate chip') {
                var chocolateChip = new ChocolateChip()
                    chocolateChip.ingredients = theIngredients;
                    chocolateChip.name = cookie_name;
                    list_cookies.push(chocolateChip)
            }else if(cookie_name == 'peanut butter'){
                var peanutButter = new PeanutButter;
                    peanutButter.ingredients = theIngredients; 
                    peanutButter.name = cookie_name;
                    list_cookies.push(peanutButter);
            }else{
                var otherCookies = new OtherCookie;
                    otherCookies.name = cookie_name;
                    otherCookies.ingredients = theIngredients;
                    list_cookies.push(otherCookies);
            }
            
        }
        
        return list_cookies;
    }

    static cookieRecommendation(day, batch){
        var listCookie = [];
        for(let a = 0; a < batch.length; a++){  
            var match = true;
            for(let b = 0; b < batch[a].ingredients.length; b++){
                if(batch[a].ingredients[b].name === 'sugar'){
                    match = false;
                    break;
                }
            }
            if(match===true){
                listCookie.push(batch[a]);
            }

        }
        return listCookie;
    }

    
}

var option = fs.readFileSync('cookies.txt', 'utf8').split('\n')
var ingredients = fs.readFileSync('ingredients.txt', 'utf8').split('\n');

let batch_of_cookies = CookieFactory.create(ingredients);

let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);
console.log("sugar free cakes are: ");

for (let i = 0; i < sugarFreeFoods.length; i++) {
    console.log(sugarFreeFoods[i].name);
}