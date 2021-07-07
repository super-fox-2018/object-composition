var fs = require('fs');

var options = fs.readFileSync('cookies.txt', 'utf8').split("\n")
class Cookie {

  constructor(name) {
    this.name = name
    this.status = 'Mentah'
    this.ingredients = []

  }

  bake() {

    this.status = 'Selesai dimasak'
  }

}
class PeanutButter extends Cookie {
  constructor(name) {
    super(name)
    this.peanut_count = 100

  }
}


class ChocholateChip extends Cookie {
  constructor(name) {
    super(name)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super(name)
    this._other_count = 150
  }
}

class Ingredient {
  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
  }
}


class CookieFactory {
  constructor() {}

  static create(option) {

    var listcookie = []
    var cookie = new Cookie;

    for (var i = 0; i < options.length - 1; i++) {
      if (options[i] == 'peanut butter') {
        listcookie.push(new PeanutButter(option[i]));
      } else if (options[i] == 'chocolate chip') {
        listcookie.push(new ChocholateChip(option[i]));
      } else {
        listcookie.push(new OtherCookie(options[i]));
      }
    }
    return listcookie
  }




}




let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies)
