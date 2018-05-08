const modul = require('./composition')

class CookieFactory{
    constructor(){
    }
    static create(option){
        let data=[]
        for (let i = 0; i < option.length; i++) {
            let name=option[i][0]
            let bahan=option[i][1]
            if(name.includes('peanut')){
                data.push(new modul.PeanutButter(name,bahan))
            }else if(name.includes('chip')){
                data.push(new modul.ChocholateChip(name,bahan))
            }else if(name.includes('cheese')){
                data.push(new modul.ChocholateCheese(name,bahan))
            }else if(name.includes('butter')){
                data.push(new modul.ChocholateButter(name,bahan))
            }
        }
        return data
    }
    static cookieRecomendation(hari,batch_of_cookies){
        let menuRecomen=[]
        if(hari.includes('selasa')){
            //Hari menu tanpa gula
           for (let i = 0; i < batch_of_cookies.length; i++) {
               if(batch_of_cookies[i]['has_sugar']===false){
                   menuRecomen.push(batch_of_cookies[i]['name'])
               }
           }
           return menuRecomen
        }
        // return menuRecomen
    }
}
const fs = require('fs')
var option = fs.readFileSync('cookies.txt').toString().split('\n')
for (let j = 0; j < option.length; j++) {
    option[j]=option[j].split((' = '))
}
let batch_of_cookies= CookieFactory.create(option)
console.log(batch_of_cookies);
let sugarFreeFood= CookieFactory.cookieRecomendation('selasa',batch_of_cookies)
console.log('Sugar free cakes are :')
for (let j = 0; j < sugarFreeFood.length; j++) {
    console.log(sugarFreeFood)
}
