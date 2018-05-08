const fs = require('fs')
class Ingredient{
	constructor(materialName,amount){
		//this.cookieName = cookieName
		this.materialName = materialName
		this.amount = amount
	}
}

class Cookie {
	constructor(name,ingredients){
		this.name = name
		this.status = "mentah"
		// Cari resep cookie yang berana this.name dari ingredients
		this.ingredients = ingredients
		this.has_sugar = null
	}
	bake(){
		this.status = "selesai dimasak"
	}
}

class PeanutButter extends Cookie {
	constructor(ingredients){
		super('peanut butter',ingredients)
		// this.name = 'peanut butter'
		this.peanut_count = 100
	}
}

class ChocholateChip extends Cookie{
	constructor(ingredients){
		super('chocolate chip',ingredients)
		//this.name = 'chocolate chip'
		this.choc_chip_count = 200
	}
}
class OtherCookie extends Cookie{
	constructor(name,ingredients){
		super(name,ingredients)
		//this._name = name
		this.other_count = 150
	}
}

class CookieFactory{
	static create(ingredients){
		let arrBaked = []
		for(var i=0;i<ingredients.length;i++){
			let arrIngred=[]
			for(var j=0;j<ingredients[i].ingredients.length;j++){
				
				let resep = new Ingredient(ingredients[i].ingredients[j][0],ingredients[i].ingredients[j][1])
				arrIngred.push(resep)
			}
			if (ingredients[i].cookieName==='peanut butter') {
					arrBaked.push(new PeanutButter(arrIngred))
				}
				else if (ingredients[i].cookieName==='chocolate chip') {
					arrBaked.push(new ChocholateChip(arrIngred))
				}
				else{
					arrBaked.push(new OtherCookie(ingredients[i].cookieName,arrIngred))
				}
		}
		return arrBaked
	}
	static cookieRecommendation(hari,obj){
		for(var i=0;i<obj.length;i++){
			//console.log(obj[i].has_sugar)
			for(var j=0;j<obj[i].ingredients.length;j++){
					//console.log(obj[i].ingredients[j].materialName)
				if (obj[i].ingredients[j].materialName==='sugar') {
					obj[i].has_sugar = true
				}
			}
			if (obj[i].has_sugar===null) {
				console.log(`${obj[i].name}`)
			}
		}
		//console.log(obj)
	}
}

var ingredients = []
//console.log(ingredients);
let options = fs.readFileSync('./cookies.txt', 'utf8').toString().split('\n')
//console.log(options)
let recipe1 = fs.readFileSync('./resep.txt', 'utf8').toString().split('\n')
for(var i=0;i<recipe1.length;i++){
	recipe1[i] = recipe1[i].split(' = ')
	//console.log(recipe1[i])
	recipe1[i][1] = recipe1[i][1].split(', ')
	let cookieRecipe = { cookieName: recipe1[i][0], ingredients: [] };
	//console.log(recipe1[i][1])
	for(var j=0;j<recipe1[i][1].length;j++){
		recipe1[i][1][j] = recipe1[i][1][j].split(' : ')
		let materialName = recipe1[i][1][j][1]
		let amount = recipe1[i][1][j][0]
		cookieRecipe.ingredients.push([materialName, amount]);
		
	}
	ingredients.push(cookieRecipe);
}

//let bahan = new Ingredient()
for(var i=0;i<ingredients.length;i++){
	//console.log(ingredients[i].cookieName)
	for(var j=0;j<ingredients[i].ingredients.length;j++){
		//console.log(ingredients[i].ingredients[j])
	}
}

//console.log(options)

let batch_of_cookies = CookieFactory.create(ingredients)
//console.log(batch_of_cookies)
console.log('sugar free cakes are:')
let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday',batch_of_cookies)

// for(var i=0;i<sugarFreeFoods.length;i++){
// 	console.log(sugarFreeFoods[i].name)
// }