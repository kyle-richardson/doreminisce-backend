import express from 'express'
import bodyParser from 'body-parser'
import { promises as fs } from 'fs'
import { people } from './data'

const port = 3500
const server = express();

server.use(bodyParser.json())

server.get('/test', (req, res) => {
    res.send('Test success')
})

server.get('/people', (req, res) => {
    res.json(people)
})

server.get('/file-data', async (req, res) => {
    const data = await fs.readFile(`${__dirname}/people-data.json`)
    const people = JSON.parse(data)

    res.json(people)
})

server.get('/people/:name', (req, res) => {
    const { name } = req.params;

    const person = people.find((ele) => ele.name.toLowerCase() === name.toLowerCase())
    res.json(person)
})

server.post('/people', (req, res) => {
    const newPerson = req.body;
    people.push(newPerson)
    res.json(people)
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
});
