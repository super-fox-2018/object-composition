const fs = require('fs')
class Ingredient{
	constructor(ingeredients){
		//this.cookieName = cookieName
		this.materialName = ''
		this.amount = 'amount'
	}
}

class Cookie {
	constructor(name){
		this.name = name
		this.status = "mentah"
		// Cari resep cookie yang berana this.name dari ingredients
		this.ingredients = []
		this.has_sugar = null
	}
	bake(){
		this.status = "selesai dimasak"
	}
}

class PeanutButter extends Cookie {
	constructor(){
		super('peanut butter')
		// this.name = 'peanut butter'
		this.peanut_count = 100
	}
}

class ChocholateChip extends Cookie{
	constructor(){
		super('chocolate chip')
		//this.name = 'chocolate chip'
		this.choc_chip_count = 200
	}
}
class OtherCookie extends Cookie{
	constructor(name){
		super(name)
		//this._name = name
		this.other_count = 150
	}
}

class CookieFactory{
	static create(options){
		let arrBaked = []
		for(var i=0;i<options.length-1;i++){
			if (options[i]=='peanut butter') {
				arrBaked.push(new PeanutButter())
			}
			else if (options[i]==='chocolate chip') {
				arrBaked.push(new ChocholateChip())
			}
			else{
				arrBaked.push(new OtherCookie(options[i]))
			}
		}
		return arrBaked
	}
	static cookieRecommendation(hari,obj){

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

let bahan = new Ingredient(ingredients)
console.log(ingredients[0].cookieName)
console.log(ingredients[0].ingredients[0][0]);
console.log(ingredients[0].ingredients[0][1])
console.log(ingredients[0].ingredients[1][0]);
console.log(ingredients[0].ingredients[1][1])


//console.log(options)

let batch_of_cookies = CookieFactory.create(options)
//console.log(batch_of_cookies)

// let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday',batch_of_cookies)
// console.log('sugar free cakes are:')
// for(var i=0;i<sugarFreeFoods.length;i++){
// 	console.log(sugarFreeFoods[i].name)
// }