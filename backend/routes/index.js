const express = require('express')
const { userRouter } = require('./user')
const { accRouter } = require('./account')

const mainRouter = express()

mainRouter.use('/user', userRouter)
mainRouter.use('/account',accRouter)

module.exports = {
    mainRouter
}