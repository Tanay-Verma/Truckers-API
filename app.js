require('dotenv').config()
require('express-async-errors')

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')


const express = require('express')
const app = express()

// connectDB
const connectDB = require('./db/connect')

// authentication
const authenticatedTrucker = require('./middleware/aunthentication')

app.use(express.json())

// routers 
const truckerRouter = require('./routes/Trucker')
const journeysRouter = require('./routes/Journeys')

// error handler middlewares
const routeNotFoundMiddleware = require('./middleware/route-not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.get('/user',(req,res)=>{
    res.status(200).json({
        messgae:"Hello Trucker"
    })
})

// app.post('/user',(req,res)=>{
//     res.status(200).json(req.body)
// })

app.set('trust proxy',1)
app.use(rateLimiter(
  {
    windowMs: 15*60*1000,
    max: 100,
  })
)

// security packages
app.use(helmet())
app.use(cors())
app.use(xss())


// routes
app.use('/api/v1/trucker',truckerRouter)
app.use('/api/v1/journeys',authenticatedTrucker,journeysRouter)


// error hadnlers
app.use(routeNotFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000

const start = async () => {
    try {
        // connect with DB here
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => 
        console.log(`Server is listening on port ${PORT}...`)
        )
    } catch (error) {
        console.log(error)
    }
}

start()