const router = require('express').Router()
const mongoUser = require('../models/Users.js')

router.get('/', async (req, res) => {
    const result = await mongoUser.find().exec()
    res.status(200).json(result)
})

router.post('/', async (req, res) => {
    const data = req.body
    console.log(data)
    const newUser = new mongoUser({
        Login: data.Login,
        Password: data.Password
    })
    const result = await newUser.save()
    res.status(200).json(result)
})

module.exports = router