"use strict"
var fs = require('fs') 
var options = fs.readFileSync('cookies.txt', 'utf8').split("\n")
// console.log(options)

class Cookie {
    constructor(name, ingredients, hasSugar){ // ingredients ini didapat dari hasil yg d ambil dibawah di class CookieFactory
        this.name = name
        this.status = "Mentah"
        this.ingredients = ingredients
        this.has_sugar= hasSugar
    }
    bake(){
        this.status = "selesai dimasak"
    }
}

class PeanutButter extends Cookie {
    constructor (name, ingredients, hasSugar){
        super(name, ingredients, hasSugar)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor (name, ingredients, hasSugar){
        super(name, ingredients, hasSugar)
        this.choco_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor (name, ingredients, hasSugar){
        super(name, ingredients, hasSugar)
        this.other_count = 150
    }
}

class Ingredients {
    constructor(options){
        this.name = options['name']
        this.amount = options['amount']
    }

}

class CookieFactory {
    static create(options){
        let cookies =[]
        for( let i=0; i<options.length; i++){
            let hasSugar= false
            let cookieName= options[i].split(" = " )
            if (cookieName[0] === "peanut butter"){
                let listIngredients=[]
                let bahan = cookieName[1].split(", ")
                // console.log(bahan)
                for(let x=0; x<bahan.length; x++){
                    var pisahBahan = bahan[x].split(" : ")
                    if(pisahBahan[1]==="sugar"){
                        hasSugar = true
                    }
                    // console.log("=====",pisahBahan)
                    listIngredients.push(new Ingredients({name : pisahBahan[1], amount: pisahBahan[0]}))
                }
                // console.log(listIngredients)
                cookies.push(new PeanutButter(cookieName[0], listIngredients, hasSugar))
            }
            else if (cookieName[0] === "chocolate chip"){
                let listIngredients=[]
                let bahan = cookieName[1].split(", ")
                // console.log(bahan)
                for(let x=0; x<bahan.length; x++){
                    var pisahBahan = bahan[x].split(" : ")
                    // console.log("=====",pisahBahan)
                    if(pisahBahan[1]==="sugar"){
                        hasSugar = true
                    }
                    listIngredients.push(new Ingredients({name : pisahBahan[1], amount: pisahBahan[0]}))
                }
                // console.log(listIngredients)
                cookies.push(new ChocolateChip(cookieName[0], listIngredients, hasSugar))
            }
            else if (cookieName[0] !== "chocolate chip" || options[i] !== "peanut butter"){
                let listIngredients=[]
                let bahan = cookieName[1].split(", ")
                // console.log(bahan)
                for(let x=0; x<bahan.length; x++){
                    var pisahBahan = bahan[x].split(" : ")
                    // console.log("=====",pisahBahan)
                    if(pisahBahan[1]==="sugar"){
                        hasSugar = true
                    }
                    listIngredients.push(new Ingredients({name : pisahBahan[1], amount: pisahBahan[0]}))
                }
                // console.log(listIngredients)
                cookies.push(new OtherCookie(cookieName[0], listIngredients, hasSugar))
            }
        }
        return cookies
    }

    static CookieRecommendation(day, batch_of_cookies){
        // console.log("=====",batch_of_cookies)
        let lessSugar=[]
        for(let i=0; i<batch_of_cookies.length; i++){
            if(batch_of_cookies[i].has_sugar === false){
                lessSugar.push(batch_of_cookies[i])
            }
        }
        return lessSugar
    }
}

let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies[0])

let sugarFreeFoods = CookieFactory.CookieRecommendation("tuesday", batch_of_cookies)
console.log("sugar free cakes are:")
for(let i=0; i<sugarFreeFoods.length; i++){
    console.log(sugarFreeFoods[i].name)
}