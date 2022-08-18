const {buildDB} = require('./db/populateDataBase')
const express = require('express');
const {Cheese} = require('./models/index')
const app = express();
const port = 3000;
buildDB();

app.get('/', (req, res) => {
    res.sendStatus(200)
});

app.get('/feta', async (req, res) => {
    // Query database for data of Feta cheese 
    const givenCheese = await Cheese.findOne({ 
        where: { 
            title: 'Feta' 
        } 
    });
    let {title, description} = givenCheese; // { x, y } <- know as destructuring
    let payLoad = {
        title: title,
        description: description
    }
    res.send(payLoad);
});

app.get('/starts-with-c', async (req, res) => {
    const cheeseArray = await Cheese.findAll();
    const startsWithC = new Array();
    for(let i = 0; i < cheeseArray.length; i++){
        let {title} = cheeseArray[i]
        if(title[0] === 'C'){
            startsWithC.push(title)
        }
    }
    res.json(startsWithC);
});

app.get('/starts-with-f', async (req, res) => {
    const cheeseArray = await Cheese.findAll();
    const startsWithF = new Array();
    const filterSelection = cheeseArray.filter((cheese) => {
        if(cheese.title[0] === 'F'){
            startsWithF.push(cheese.title)
        };
    });
    res.json(startsWithF);
});

app.listen(port, () => {
    console.log(`server is up and listening at http://localhost:${port}`)
});