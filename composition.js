"use strict"

const fs = require('fs');

class Cookie {
  constructor(name) {
    this.name = name;
    this.status = "mentah";
    this.ingredients = [];
  }

  bake() {
    this.status = "selesai dimasak";
  }
}

class PeanutButter extends Cookie {
  constructor(name) {
    super(name);
    this.peanut_count = 100;
  }
}

class ChocoChip extends Cookie {
  constructor(name) {
    super(name);
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super(name);
    this.other_count = 150;
  }
}

class Ingredient {
  // store resep -> nama bahan dan jumlah
}

class CookieFactory {
  static create(options) {
    let parser = fs.readFileSync(options, 'utf8');
    let cookieArray = parser.split('\n');
    let cookieList = [];

    for (let i = 0; i < cookieArray.length; i++) {
      // Composition method
      if (cookieArray[i] === 'peanut butter') {
        cookieList.push(new PeanutButter(cookieArray[i]))
      } else if (cookieArray[i] === 'chocolate chip') {
        cookieList.push(new ChocoChip(cookieArray[i]));
      } else {
        cookieList.push(new OtherCookie(cookieArray[i]));
      }
    }
    return cookieList;
  }
}

// dapatkan list kue dari cookies.txt, simpan ke var options,
// buat dalam method create
let options = 'cookies.txt';

// contoh driver code
let batchOfCookies = CookieFactory.create(options);
console.log(batchOfCookies); // array of objects