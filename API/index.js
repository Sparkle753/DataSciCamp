const express = require('express')
const db = require("./db")
const application = express()
application.use(express.json())

application.get("/", function(request, response){
    // response.send("DataRockie")
    response.json({
        "name":"Datarockie",
        "version": "1.0"
    })
})

application.post("/hotels", function(request,response){
    const name = request.body.name
    const price = request.body.price

    const statement = db.prepare("INSERT INTO hotels (name,price) VALUES (?,?)") 
    const result = statement.run(name,price)
    response.json(result)
})

application.get("/hotels",function(request,response){
    const statement = db.prepare("SELECT * from hotels")
    const result = statement.all()
    response.json(result)
})

application.listen(3000,function(){
    console.log("Application started at http://localhost:3000")
})