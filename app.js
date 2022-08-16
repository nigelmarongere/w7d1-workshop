const {buildDB} = require('./db/populateDataBase')
const express = require('express')
const {Cheese} = require('./models')
const app = express()
buildDB()


app.get('/cheeses/:cheese', async (req, res) => {
    
    let newString = req.params.cheese[0].toUpperCase() + req.params.cheese.slice(1).toLowerCase()

    const queriedCheese = await Cheese.findOne({where: {title: newString}})
    if (!queriedCheese) {
        res.send("Sorry, we don't have that cheese.")
        return 
    }
    let {title, description } = queriedCheese
    let payload = {
        title: title,
        description: description
    }
    res.send(payload)
})


app.get('/cheeses', async (req, res) => {

    const dbQuery = await Cheese.findAll()
    let startsWithLetter = dbQuery.filter((cheese)=> { 
        if (cheese.title[0] === req.query.startswith.toUpperCase()) {
            return true}
    }) 
    if (startsWithLetter.length === 0) {
        res.send("Sorry, no matches.")
    } else {
        let payload = startsWithLetter.map((cheeseObj) => {
            return {
                title: cheeseObj.title,
                description: cheeseObj.description
            }
        })
        res.send(payload)
    }
})



app.listen(3000, ()=>{
    console.log('The server is live and listening at http://localhost:3000')
})





