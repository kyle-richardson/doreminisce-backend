import express from 'express'
import {getChart} from 'billboard-top-100'
import {redirectURI, clientId, clientSecret, frontEnd} from "../config"
const querystring = require('querystring');
const https = require('https')
const axios = require('axios')

const configureMiddleware = require("./server-middleware.js");

const port = process.env.PORT || 5500
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

server.get('/auth-spotify', (req, res) => {
    res.redirect("https://accounts.spotify.com/authorize?" + 
        querystring.stringify({
            client_id: clientId,
            // scope: 'user-read-private user-read-email',
            response_type: 'code',
            redirect_uri: redirectURI
        }))
})

server.get('/callback', (req, res) =>{
    const code = req.query.code || null
    const authOptions = {
        method: 'post',
        url:'https://accounts.spotify.com/api/token',
        params: {
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            grant_type :'authorization_code',
            redirect_uri: redirectURI
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    axios(authOptions)
    .then(token => {
        const access_token = token.data.access_token
        const uri = frontEnd
        res.redirect(uri + '?access_token=' + access_token)
    })
    .catch(e=> {
        console.log(e.response.data);
    });
  })

server.listen(port, () => {
    console.log(`Server listening on port ==${port}==.`)
});
