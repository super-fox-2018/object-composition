class CookieFactory {
	constructor() {
		this.listCookies=[]
	}
	//  create(options) {
	// 	for(let i=0;i<options.length;i++) {
	// 		if(options[i] == "peanut butter") {
	// 			let peanutButter = new PeanutButter()
	// 			this.listCookies.push(peanutButter)
	// 		}else if(options[i] == "chocolate chip"){
	// 			let chocolateChip = new ChocolateChip()
	// 			this.listCookies.push(chocolateChip)
	// 		}else{
	// 			let otherCookie = new OtherCookie(options[i])
	// 			this.listCookies.push(otherCookie)
	// 		}
	// 	}
	// }

	// create(options) {
	// 	for(let i=0)
	// }
	create(options) {
		for(let i=0;i<options.length;i++) {
			var arrIngred=[]
			var cookie = options[i].split(" = ")[0]
			var ingred = options[i].split("=")[1].split(",")
			//console.log(ingredients)
			for(let j=0;j<ingred.length;j++) {
				var ingred2 = ingred[j].split(":")
				//console.log(ingredients2)
				var ingredients = new Ingredients(ingred2[1],ingred2[0])
				arrIngred.push(ingredients)
			}
			//console.log(cookie)
			if(cookie == "peanut butter") {
				let peanutButter = new PeanutButter(arrIngred)
				this.listCookies.push(peanutButter)
			}else if(cookie == "chocolate chip"){
				let chocolateChip = new ChocolateChip(arrIngred)
				this.listCookies.push(chocolateChip)
			}else{
				let otherCookie = new OtherCookie(cookie,arrIngred)
				this.listCookies.push(otherCookie)
			}
			
			
		}
		
	}
}

class Ingredients {
	constructor(name,amount) {
		this.name = name
		this.amount = amount
	}
}

class Cookie {
	constructor(name,peanut_count,ingredients) {
		this.name = name
		this.status="mentah"
		this.ingredients=ingredients
		this.peanut_count=peanut_count
	}

	bake() {
		this.status = "selesai dimasak"
	}
}

class PeanutButter extends Cookie {
	constructor(ingredients) {
		super("peanut butter",100,ingredients)

	}
}

class ChocolateChip extends Cookie {
	constructor(ingredients) {
		super("chocolate chip",200,ingredients)
	}
}

class OtherCookie extends Cookie {
	constructor(name,ingredients) {
		super(name,150,ingredients) 
	}
}

var fs = require("fs")
var options = fs.readFileSync("./ingredients.txt").toString().split("\n")

 let cookieFactory = new CookieFactory()

cookieFactory.create(options);
 console.log(cookieFactory.listCookies)

//console.log(options)
