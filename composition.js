class CookieFactory {
	constructor() {
		this.listCookies=[]
	}

	create(options) {
		for(let i=0;i<options.length;i++) {
			var arrIngred=[]
			var cookie = options[i].split(" = ")[0]
			var ingred = options[i].split("=")[1].split(",")
			//console.log(ingredients)
			// for(let j=0;j<ingred.length;j++) {
			// 	var ingred2 = ingred[j].split(":")
			// 	//console.log(ingredients2)
			// 	var ingredients = new Ingredients(ingred2[1],ingred2[0])
			// 	arrIngred.push(ingredients)
			// }
			//console.log(cookie)
			if(cookie == "peanut butter") {
				let peanutButter = new PeanutButter(ingred)
				this.listCookies.push(peanutButter)
			}else if(cookie == "chocolate chip"){
				let chocolateChip = new ChocolateChip(ingred)
				this.listCookies.push(chocolateChip)
			}else{
				let otherCookie = new OtherCookie(cookie,ingred)
				this.listCookies.push(otherCookie)
			}
			
			
		}
		
	}

	cookieRecommendation(day) {
		var arrRecomend=[]
		for(let i=0;i<this.listCookies.length;i++) {
			var count=1
			for(let j=0;j<this.listCookies[i].ingredients.length;j++) {
				if(day == "tuesday") {
					if(this.listCookies[i].ingredients[j].name == " sugar")	 {
						count*=0
					}
				}	
			}
			if(count==1) {
				arrRecomend.push(this.listCookies[i].name)
			}
			
		}
		return arrRecomend
			
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
		this.ingredients=this.assignIngredient(ingredients)
		this.peanut_count=peanut_count
	}

	assignIngredient(ingredients) {
		var arrIngred =[]
		for(let j=0;j<ingredients.length;j++) {
				var ingred2 = ingredients[j].split(":")
				//console.log(ingredients2)
				var resep = new Ingredients(ingred2[1],ingred2[0])
				arrIngred.push(resep)
		}
		return arrIngred
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
// console.log(cookieFactory.listCookies)
let sugarFreeFoods = cookieFactory.cookieRecommendation("tuesday")
console.log("sugar free cakes are:")
for(let i=0;i<sugarFreeFoods.length;i++) {
	console.log(sugarFreeFoods[i])
}

