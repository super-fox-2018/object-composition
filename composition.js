'use strict'
const fs = require('fs')
var theOrder = fs.readFileSync('cookies.txt', 'utf8').split('\n');
// console.log(theOrder)

class CookieFactory{
    constructor(){
        this.cookies = []
    }

    static food(list){
        let makanan =[]
        let pisah
        for(let i=0;i<list.length;i++){
            
            for(let j=0;j<list[i].length;j++){
                if(list[i][j] === '='){
                    pisah =list[i].slice(0,j-1)
                    makanan.push(pisah)
                }
            }
        }
        return makanan
    }

    static create(listOrder){
        
      
        let bahan =[]
        let pisah;
        for(let i=0;i<listOrder.length;i++){
           for(let j=0;j<listOrder[i].length;j++){
               if(listOrder[i][j] === '='){
                   pisah = listOrder[i].slice(j+2)
                   bahan.push(pisah)
               }
           }
           
        }
        var arr=[]
        for(let i=0;i<bahan.length;i++){
            var hasil =bahan[i].split(',')
            arr.push(hasil)
          }
        
          var tampung =[]
          
        for(let i=0;i<arr.length;i++){
            var tempt =[]
            
            for(let j=0;j<arr[i].length;j++){
                var satu =[]
                for(let k =0;k<arr[i][j].length;k++){
                    if(arr[i][j][k] === ':'){
                        var hasil = arr[i][j].slice(k+1)
                        var hasil2 =arr[i][j].slice(0,k)
                        satu.push(hasil,hasil2)
                    }
                    if(tempt.indexOf(satu) === -1){
                    tempt.push(satu)}
                   
                }
                
            }
            tampung.push(tempt)
        }
        
        
        var result =[]
        for(let i =0;i<tampung.length;i++){
           
          var sementara =[]
         
            for(let j=0;j<tampung[i].length;j++){
                var obj ={}
                obj.name = tampung[i][j][0]
                obj.amount = tampung[i][j][1]
                sementara.push(obj)
            }
            // obj.ingredients = sementara
            result.push(sementara)
        }
        // return result
      
        let listFood = this.food(listOrder)
        let final =[]
        for(let i =0;i<listFood.length;i++){
            if(listFood[i] === 'peanut butter'){
                var peanut = new PeanutButter
                peanut.name =listFood[i]
                peanut.ingredients = result[i][0]
                final.push(peanut)
            }else if(listFood[i] === 'chocolate chip'){
                var chip = new ChocholateChip
                chip.name = listFood[i]
                chip.ingredients = result[i][0]
                final.push(chip)

            }else if(listFood[i] === 'chocolate cheese'){
                var cheese = new ChocholateCheese
                cheese.name = listFood[i]
                cheese.ingredients = result[i][0]
                final.push(cheese)
            }   
        }
        return final

    }


  
}



class Cookie{
    constructor(name,ingredients){
        this.status = 'mentah'
        this.name = name
        this.ingredients = ingredients
    }

    bake(){
        this.status = 'selesai dimasak'
    }
}

class PeanutButter extends Cookie{
    constructor(name,ingredients){
        super(name,ingredients)
        this.peanut_count = 100
    }
}

class ChocholateChip extends Cookie{
    constructor(name,ingredients){
        super(name,ingredients)
        this.choc_chip_count = 200
    }
}

class ChocholateCheese extends Cookie{
    constructor(name,ingredients){
        super(name,ingredients)
        this.chess_count = 100
    }
}

class Ingredients{
    constructor(option){
        this.name = option['name']
        this.ammount = option['amount']  
    }
}    

let batch_of_cookies = CookieFactory.create(theOrder);
console.log(batch_of_cookies)

