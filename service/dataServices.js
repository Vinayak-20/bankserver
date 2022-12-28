const db = require('./db.js')


// import jsonwebtoken

const jwt = require('jsonwebtoken')



userDetails = {
    1000: { acno: 1000, username: "anu", password: 123, balance: 0, transaction: [] },
    1001: { acno: 1001, username: "amal", password: 123, balance: 0, transaction: [] },
    1002: { acno: 1002, username: "arun", password: 123, balance: 0, transaction: [] },
    1003: { acno: 1003, username: "mega", password: 123, balance: 0, transaction: [] }
}


// function for register

// register = (acno, uname, psw) => {

//    return db.User.findOne({ acno }).then(user => {
//         if (user) {
//             return {
//                 statusCode: 401,
//                 status: false,
//                 message: "user already exist"
//             }

//         }
//         else {
//             const newuser = new db.User({
//                 acno,
//                 username: uname,
//                 password: psw,
//                 balance: 0,
//                 transaction: []




//             })
//             newuser.save()
//             return {
//                 statusCode: 200,
//                 status: true,
//                 message: "registration success"
//             }
//         }

//     })

// if (acno in userDetails) {
//     return {
//         statusCode: 401,
//         status: false,
//         message: "user already exist"
//     }
// }
// else {
//     userDetails[acno] = { acno, username: uname, password: psw, balance: 0, transaction: [] }

// }


register = (acno, uname, psw) => {
    return db.User.findOne({ acno }).then(user => {
        if (user) {
            return {
                statusCode: 401,
                status: false,
                message: "user already exist"
            }
        }
        else {
            const newuser = new db.User({
                acno,
                username: uname,
                password: psw,
                balance: 0,
                transaction: []
            })
            newuser.save()
            return {
                statusCode: 200,
                status: true,
                message: "Registration success"
            }
        }
    })

}


// function of login....

login = (acno, psw) => {

    return db.User.findOne({ acno, password: psw }).then(user => {
        if (user) {
            const token = jwt.sign({ currentAcno: acno }, 'secretkey24')
            return {
                statusCode: 200,
                status: true,
                message: "login success",
                token
            }


        }
        else {
            return {
                statusCode: 401,
                status: false,
                message: "incorrect password or accountnumber"
            }

        }

    })
}

// if (acno in userDetails) {
//     if (psw == userDetails[acno]["password"]) {

//         return {
//             statusCode: 200,
//             status: true,
//             message: "login success",
//             token
//         }


//     }
//     else {
//         return {
//             statusCode: 401,
//             status: false,
//             message: "incorrect password"
//         }
//     }
// }
// else {
//     return {
//         statusCode: 401,
//         status: false,
//         message: "incorrect account number"
//     }
// }



// ...function of deposit...........

deposit = (acno, password, amount) => {
    var amnt = parseInt(amount)

    return db.User.findOne({ acno, password }).then(user => {

        if (user) {
            user.balance += amnt
            user.transaction.push({ type: 'CREDIT', amount: amnt })
            user.save()   //(to reflect in data base we use save)


            return {
                statusCode: 200,
                status: true,
                message: `${user.balance}`
            }


        }
        else {
            return {
                statusCode: 401,
                status: false,
                message: "incorrect account number or password"
            }

        }
    })

}


//   ......function of withdraw.....


withdraw = (acno, password, amount) => {

    var amnt = parseInt(amount);

    return db.User.findOne({ acno, password }).then(user => {
        if (user) {

            if (user.balance >= amnt) {
                user.balance -= amnt;
                user.transaction.push({ type: 'DEBIT', amount: amnt })
                user.save();

                return {
                    statusCode: 200,
                    status: true,
                    message: user.balance

                };

            }
            else {
                return {
                    statusCode: 401,
                    status: false,
                    message: 'insufficient balance'

                };
            }


        }


        else {

            return {
                statusCode: 401,
                status: false,
                message: 'incorrect acno or  password'

            };
        }
    })

}

//   .......transaction...........


gettransaction = (acno) => {

    return db.User.findOne({acno}).then(user=>{

        if(user){

            return {
                statusCode: 200,
                status: true,
                message: user.transaction
            }

        }
        else{
            return {
                statusCode: 401,
                status: false,
                message: "incorrect account number"
            }

        }
    })
    // if (acno in userDetails) {
    //     return {
    //         statusCode: 200,
    //         status: true,
    //         message: userDetails[acno]["transaction"]
    //     }

    // }
    // else {
    //     return {
    //         statusCode: 401,
    //         status: false,
    //         message: "incorrect account number"
    //     }

    // }

}



// we need to export the data so we use......

module.exports = {

    register,
    login,
    deposit,
    withdraw,
    gettransaction

}
