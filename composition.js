"use strict"

const fs = require("fs")
const options = fs.readFileSync('cookies.txt','utf-8').split('\r\n')


class Ingredient{
    constructor(options){
        this.name = options['name']
        this.amount = options['amount']
    }

}
class Cookie{
    constructor(name){
        this.name = name
        this.ingredients = []
        this.status = "mentah"
        this.has_sugar = null
        // this.ingredients = new 
    }

    bake(){
        this.status = "selesai dimasak"
    }

}

class PeanutButter extends Cookie{
    constructor(name){
        super(name)

        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie{
    constructor(name){
        super(name)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie{
    constructor(name){
        super(name)
        this.other_count = 150
    }
}

class CookieFactory{
    static create(options){
        //accepts a list of cookie types and returns those cookies
        let cookieList = []
        for(let i = 0; i < options.length; i++){
            switch(options[i]){
                case "peanut butter":
                    cookieList.push(new PeanutButter(options[i]))
                    break;
                case "chocolate chip":
                    cookieList.push(new ChocolateChip(options[i]))
                    break;
                default:
                    cookieList.push(new OtherCookie(options[i]))
            }
        }

        for(let j = 0; j < cookieList.length; j++){
            let checkIngredient = this.checkIngredient(cookieList[j]['name'])
            if(checkIngredient[0] === true)cookieList[j]['has_sugar'] = true
            checkIngredient.splice(0,1)
            cookieList[j]['ingredients'].push(...checkIngredient)
        }

        return cookieList

    }

    static checkIngredient(namecomparator){
        let arrayOfRecipe = [[]]
        const recipe = fs.readFileSync('recipe.txt','utf-8').split('\r\n')
        for(let i = 0; i < recipe.length; i++){
            // console.log(recipe[i])
            recipe[i] = recipe[i].split(' = ')
            if(recipe[i][0] === namecomparator){
                recipe[i][1] = recipe[i][1].split(', ')
                for(let n = 0; n < recipe[i][1].length; n++){
                    recipe[i][1][n] = recipe[i][1][n].split(' : ')
                    let amount = recipe[i][1][n][0]
                    let name = recipe[i][1][n][1]
                    if(name === 'sugar') arrayOfRecipe[0] = true
                    arrayOfRecipe.push(new Ingredient({name:name,amount:amount}))
                }
            }
        }
        return arrayOfRecipe
    }

    static cookieRecommendation(day, cookieList){
        let freeSugarCookies = []
        for(let i = 0; i < cookieList.length; i++){
            if(cookieList[i]['has_sugar'] == null){
                freeSugarCookies.push(cookieList[i])
            }
        }
        return freeSugarCookies
    }
    //define other methods as needed
}

//contoh driver code
//sesuaikan dengan model inheritance
//baca daftar kue dari file dan kirim ke cookie Factory
//di mana lokasi file yang kamu tulis supaya code bisa berjalan?
let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies)
let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);
console.log("sugar free cakes are :")
for(let i = 0; i < sugarFreeFoods.length; i++){
    console.log(sugarFreeFoods[i].name)
}