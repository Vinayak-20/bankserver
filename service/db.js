// ...........server mdb intergration...........................//

//   Steps  //

//1. import mangoose

// const { default: mongoose } = require('mongoose')
const { default: mongoose } = require('mongoose')
const mangoose = require('mongoose')


//2. state connection string via mangoose

mongoose.connect('mongodb://localhost:27017/bankServer', { useNewUrlParser: true })



//3. define a bank database Model

const User = mongoose.model('User', {
    acno: Number,
    username: String,
    password: String,
    balance: Number,
    transaction: []

})



//4. export the schema to use in another files

module.exports={
    User
}