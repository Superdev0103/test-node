const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3123

var array =[];

// We are using our packages here
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors())

//You can use this to check if your server is working

//Route that handles signup logic
app.post('/', (req, res) =>{
    let data = req.body.expires.split("||");
    if (array.filter(item => item === data[0]).length == 0) {
        array.push(data[0]);
        console.log("Client ", array.indexOf(data[0]), ":", new Date(), ": connected")
    }
    console.log("Client ", array.indexOf(data[0]), ":", new Date(), ":", data[1]);
    res.json("ok");
})

app.post('/connect', (req, res) => {
    let length = array.filter(item => item === req.body.expires).length;
    if (length === 0) {
        array.push(req.body);
        console.log("Client ", array.indexOf(req.body.expires), ":", new Date(), ": connected")
    } else {
        console.log("Client ", array.indexOf(req.body.expires), ":", new Date(), ": disconnected")
        array = array.filter(item => item !== req.body.expires);
    }
    res.json("ok");
}) 

//Start your server on a specified port
app.listen(port, ()=>{
    console.log(`Server is runing on port ${port}`)
})