const Trucker = require('../models/Trucker')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')


const register = async (req,res)=>{
    const trucker = await Trucker.create(req.body)
    const token = trucker.createJWT()

    res.status(StatusCodes.OK).json({
        trucker:{name:trucker.name},
        token
    })
}

const login = async (req,res)=>{
    const {email, password} = req.body
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    if(!email.match(emailRegex)){
        throw new BadRequestError('Please provide a valid email')
    }

    const trucker = await Trucker.findOne({email})

    // if no trucker is found   
    if(!trucker){
        throw new UnauthenticatedError('Trucker not foudnd in our database, please check your email again')
    }

    const isPasswordCorrect = await trucker.comparePassword(password)

    // password does not match
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    // JWT Token for Authentication
    const token = trucker.createJWT()

    res.status(StatusCodes.OK).json({
        trucker:{name:trucker.name},
        token
    })
}

module.exports = {
    register,
    login
}