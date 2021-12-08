import express from 'express'
import { getChart } from 'billboard-top-100'
import moment from 'moment'
import {
    redirectURI, clientId, clientSecret, frontEnd,
} from '../config'

const querystring = require('querystring');
const axios = require('axios')

const configureMiddleware = require('./server-middleware.js');

const port = process.env.PORT || 5500 // heroku adds port on deploy
const server = express();
configureMiddleware(server);

server.get('/', (req, res) => {
    res.send('API running')
})

// getChart will not work directly on front end, because it is not CORS enabled.
server.get('/chart/:date', (req, res) => {
    const { date } = req.params; // date format: 'YYYY-MM-DD'
    const prevSaturday = new Date(date)
    prevSaturday.setDate(prevSaturday.getDate() - (prevSaturday.getDay() + 1) % 7)
    const formattedPrevSat = moment(prevSaturday).format('YYYY-MM-DD')
    getChart('hot-100', formattedPrevSat, (err, ch) => {
        if (err) res.json({ songs: [], error: err })
        else res.json(ch)
    })
})

// OAuth 2.0 flow, per spotify api docs
server.get('/auth-spotify', (req, res) => {
    res.redirect(`https://accounts.spotify.com/authorize?${
        querystring.stringify({
            client_id: clientId,
            scope: 'playlist-modify-public playlist-modify-private',
            response_type: 'code',
            redirect_uri: redirectURI,
        })}`)
})

server.get('/auth-search', (req, res) => {
    const authOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        params: {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'client_credentials',
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }
    axios(authOptions)
        .then((token) => {
            const { access_token } = token.data
            res.json(access_token)
        })
        .catch((e) => {
            res.json({ err: e.response.data })
        });
})

server.get('/callback', (req, res) => {
    const code = req.query.code || null
    const authOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        params: {
            client_id: clientId,
            client_secret: clientSecret,
            code,
            grant_type: 'authorization_code',
            redirect_uri: redirectURI,
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }
    axios(authOptions)
        .then((token) => {
            const { access_token } = token.data
            const uri = frontEnd
            res.redirect(`${uri}?access_token=${access_token}`)
        })
        .catch((e) => {
            console.log(e.response.data);
        });
})

server.listen(port, () => {
    console.log(`Server listening on port ==${port}==.`)
});
