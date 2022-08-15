const {buildDB} = require('./db/populateDataBase')
const express = require('express')
const {Cheese} = require('./models')
const app = express()
buildDB()


app.get('/feta', async (req, res) => {
    const queriedCheese = await Cheese.findOne({where: {title: 'Feta'}})
    let {title, description } = queriedCheese
    let payload = {
        title: title,
        description: description
    }
    res.send(payload)
    // Database Query
})

app.get('/starts-with-c', async (req, res) => {
    const dbQuery = await Cheese.findAll()
    let startsWithC = dbQuery.filter((cheese)=> {
        if (cheese.title[0] === 'C') {
            return true}
    })

    res.send(startsWithC)
})

 


app.listen(3000, ()=>{
    console.log('The server is live and listening at http://localhost:3000')
})





