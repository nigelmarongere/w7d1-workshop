const {buildDB} = require('./db/populateDataBase')
const express = require('express');
const {Cheese} = require('./models/index')
const app = express();
const port = 3000;
buildDB();

app.get('/', (req, res) => {
    res.sendStatus(200)
});

// WEEK 7 DAY 1
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

// WEEK 7 DAY 2
app.get('/cheeses/:type', async (req, res) => {
    const find = req.params.type
    const result = await Cheese.findOne({
        where: {
            title: find
        }
    })
    if(result === null){
        res.sendStatus(404)
    }else{
        res.json(result.description)
    }
});

// localhost:3000/starts-with?letter=C; req.query returns e.g { letter: 'C'}
app.get('/starts-with', async (req, res) => {
    const letter = req.query.letter;
    const cheeseArray = await Cheese.findAll();
    const startsWithLetter = new Array();
    const filterSelection = cheeseArray.filter((cheese) => {
        if(cheese.title[0] === letter){
            startsWithLetter.push(cheese.title)
        };
    });
    res.json(startsWithLetter);
});

// Getting data using both route and query params
// localhost:3000/cheeses/Feta?provide=description; req.query returns e.g. { provide: 'description' }
app.get('/cheeses/:stated', async (res, req) => {
    const statedCheese = req.params.stated;
    const result = await Cheese.findOne({
        where: {
            title: statedCheese
        }
    });
    const { provide } = req.query;
    res.json(result[provide]);
});

app.listen(port, () => {
    console.log(`server is up and listening at http://localhost:${port}`)
});