// import cors

const cors=require('cors')




// import data service file from service folder

// we use a variable to store the data 

const dataServices = require("./service/dataServices")

//.............................................................//



// import jsonwebtoken

const jwt=require("jsonwebtoken")

//..............................................................//



// import express

const express = require('express');
const { response } = require("express");

//..................................................................//



// create app

const app = express()

//.......................................................///

// connect frontend
app.use(cors({origin:'http://localhost:4200/'}))

//.....................................................................//



// to convert json data we use ..

app.use(express.json())

//.......................................................................//



// middleware for verify token

    const jwtmiddleware=(req,res,next)=>{
         
        console.log("router specific middleware.....");

        // try-catch
        
        try{

        const token=req.headers['access-token']
        jwt.verify(token,"secretkey24")
        const data= jwt.verify(token,"secretkey24")
        console.log(data);
        next()
        }
        catch{
           res.status(422).json( {
                statusCode:400,
                status :false,
                message:"please login"
            })
        }  

           
    }

//.........................................................................//


//..........register............

app.post('/register', (req, res) => {


    dataServices.register(req.body.acno, req.body.uname, req.body.psw).then(result=>{

    res.status(result.statusCode).json(result)
    })



})


//.............................................................................//



// .........login...................

app.post('/login', (req, res) => {


   dataServices.login(req.body.acno, req.body.psw).then(result=>{

    res.status(result.statusCode).json(result)

   })
})


//............................................................................//




// ............deposit..................

app.post('/deposit',jwtmiddleware, (req, res) => {


    dataServices.deposit(req.body.acno, req.body.password, req.body.amount).then(result=>{
        
        res.status(result.statusCode).json(result)

    })




})

//...............................................................................//



// ..........withdraw........


app.post('/withdraw',jwtmiddleware, (req, res) => {


    dataServices.withdraw(req.body.acno, req.body.password, req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)


    })




})

//...................................................................................//



// ........transaction.......

app.get('/gettransaction',jwtmiddleware, (req, res) => {


     dataServices.gettransaction(req.body.acno).then(result=>{
        res.status(result.statusCode).json(result)

        
     })




})

app.listen(3000, () => {

    console.log("server started at prt number 3000");

})

//.................................................................................//







// create request


// ........................................///
// register
// login
// withdraw
// deposit
// delete
// transaction history


// GET

// app.get('/',(req,res)=>{
//     res.send("GET Method checking...")
// })

// // POST

// app.post('/',(req,res)=>{

//     res.send('POST Method checking.......')
// })

// // PUT

// app.put('/',(req,res)=>{

//     res.send('PUT Method checking.......')
// })

// // DELETE

// app.delete('/',(req,res)=>{

//     res.send('DELETE Method checking.......')
// })

// // PATCH

// app.patch('/',(req,res)=>{

//     res.send('PATCH Method checking.......')
// })



// port set
