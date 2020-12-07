const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ws = require('ws')
const bodyParser = require('body-parser')

const serverData = {
    HTTP_PORT: 3000,
    HTTP_URL: 'http://localhost:3000',
    WebSocket_PORT: 1000,
    WebSocket_URL: 'ws://localhost:1000',
    MongoDB_PORT: 27017,
    MongoDB_URL: 'mongodb://localhost:27017/DeimosServer'
}

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.contentType('application/json')
    next()
})

init(serverData)

async function init (serverData) {
    await mongoose.connect(serverData.MongoDB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    
    mongoose.connection.once('open', () => {
        app.listen(serverData.HTTP_PORT, (err) => {
            if (err) return new Error(`error in starting server, error: ${err}`)
            else console.log(`server started on \nPORT: ${serverData.HTTP_PORT}\nURL: ${serverData.HTTP_URL}`)
        })

        app.use('/users', require('./endPoints/users.js'))
    })
    mongoose.connection.emit('open')
}
