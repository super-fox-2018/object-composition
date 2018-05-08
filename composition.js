class Cookie{
    constructor(name,ingredient){
        this.name=name
        this.status='mentah'
        this.has_sugar=false
        this.ingredients=this.ingredient(ingredient)

    }
    bake(){
        this.status='selesai dimasak'
    }
    ingredient(ingredient){
        let arr=[]
        let bahan=ingredient.split(',')
        for (let j =0;j < bahan.length;j++) {
            bahan[j]=bahan[j].split(':')
            bahan[j]={
                'name':bahan[j][1],
                'amount':bahan[j][0],
            }
            if(bahan[j]['name'].trim()==='sugar'){
                this.has_sugar=true;
            }
            console.log(bahan[j]['name'])
            let ingre=new Ingredients(bahan[j])
            arr.push(ingre.data())
        }
        this.ingredients=arr;
        return this.ingredients
    }
}
class Ingredients{
    constructor(option){
        this.name=option['name']
        this.amount=option['amount']
    }
    data(){
        return{
            'name':this.name,
            'amount':this.amount,
        }
    }
}
class PeanutButter extends Cookie{
    constructor(name,ingredient){
        super(name,ingredient)
        this.peanut_count=100
    }
}
class ChocholateChip extends Cookie{
    constructor(name,ingredient){
        super(name,ingredient)
        this.peanut_count=200
    }
}
class ChocholateCheese extends Cookie{
    constructor(name,ingredient){
        super(name,ingredient)
        this.peanut_count=150
    }
}
class ChocholateButter extends Cookie{
    constructor(name,ingredient){
        super(name,ingredient)
        this.peanut_count=150
    }
    bahan(){
        super.ingredients.push(`1 cup : ch`)
    }
}
//console.log(option);
module.exports = {
    Cookie:Cookie,
    Ingredients:Ingredients,
    PeanutButter:PeanutButter,
    ChocholateChip:ChocholateChip,
    ChocholateCheese:ChocholateCheese,
    ChocholateButter:ChocholateButter
}
