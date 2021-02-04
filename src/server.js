import express from 'express'
import {getChart} from 'billboard-top-100'
const configureMiddleware = require("./server-middleware.js");

const port = 3500
const server = express();
configureMiddleware(server);

server.get('/', (req, res) => {
    res.send('API running')
})

server.get('/chart/:date', (req, res) => { //date format: 'YYYY-MM-DD'
    const { date } = req.params;
    getChart('hot-100', date, (err, ch) => {
        if (err) res.json({error: err})
        else res.json(ch)
    })
    
})

server.listen(port, () => {
    console.log(`Server listening on port ==${port}==.`)
});
