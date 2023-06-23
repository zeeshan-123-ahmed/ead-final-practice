console.log("Hello, World!") //Hello, World!

console.log(global) //print global object with its members

const os = require('os'); //importing os module (built-in module)
const path = require('path'); //importing path module (built-in module)
const math = require('./math'); //importing module named "math" use ./ because its custom module
const {add, subtract, multiply, divide} = require('./math') //destructure specific function


console.log(math.add(2,3)); //5
console.log(add(6,5)) //11
console.log(subtract(3,2)) //1
console.log(multiply(2,4)) //8
console.log(divide(4,3)) //1.33

console.log(os.type())
console.log(os.version())
console.log(os.homedir())

console.log(__dirname)
console.log(__filename)

console.log(path.dirname(__filename))
console.log(path.basename(__filename))
console.log(path.extname(__filename))

console.log(path.parse(__filename))