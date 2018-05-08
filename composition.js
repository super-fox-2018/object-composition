"use strict"

let fs = require("fs") 
let options = fs.readFileSync('cookies.txt', 'utf8').split("\r\n")
let optionsIGD = fs.readFileSync('cookiesigd.txt', 'utf8').split("\r\n")
//console.log(options)
class Cookie {
    constructor (name) {
        this.name = name
        this.status = 'mentah'
        this.ingredients =[]
    }

    bake () {
        this.status = 'selesai  dimasak'
    }
}
let cookie = new Cookie ()

class PeanutButter extends Cookie {
    constructor (name) {
        super (name)
        this.peanut_count = 100
    }
}
let peanutButter = new PeanutButter (options[0])

class ChocolateChip extends Cookie {
    constructor (name) {
        super (name)
        this.choc_chip_count = 200
    }
}
let chocolateChip = new ChocolateChip (options[1])

class OtherCookie extends Cookie {
    constructor (name) {
        super (name)
        this.other_count = 150
    }
}
let otherCookieCheese = new OtherCookie (options[2])
let otherCookirButter = new OtherCookie (options[3])
// Driver Code

class CookieFactory {
    constructor () {
    }
    static create (options) {
        let arrOfCookies = []
        arrOfCookies.push(peanutButter)
        arrOfCookies.push(chocolateChip)
        arrOfCookies.push(otherCookieCheese)
        arrOfCookies.push(otherCookirButter)
        return arrOfCookies
    }
}

let batch_of_cookies = CookieFactory.create(options) 
console.log(batch_of_cookies)
