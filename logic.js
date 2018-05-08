function data(num) {
for (let i = 0; i < num.length; i++) {
var tampung =''
tampung = num[i].split('=')
var tampung2 = tampung[1].split(',')

}
var tampung3 =''
for (var j = 0; j < tampung2.length; j++) {
   tampung3 += tampung2[j].split(':')
}
return tampung3.split(',')
}
console.log(data(['peanut butter = 1 cup : flour,2 cuprs(gluten) : sugar,2 cups : peanut butter,1 cup : cinnamon, 2 tsp : butter']));
