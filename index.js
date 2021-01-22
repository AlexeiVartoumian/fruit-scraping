const express = require('express');
const bodyParser = require('body-parser');
const layout = require('./layout');

const app = express()
app.use(bodyParser.urlencoded({extended: true}));

/*
app.get('/',  (req,res) => {
    res.send('helloooo')
})
*/
app.get('/', async (req,res) => {
   
   res.send(await layout())
})


app.listen(3000, () => {
    console.log('listening')
})