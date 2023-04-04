import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import colorRoute from './routes/colorRoute.js'



dotenv.config()
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use(helmet())

const connection = async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Database connected'))
        .catch(err => console.log(err))
}

const port = process.env.PORT || 3000;

//* Routes

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/colors', colorRoute)
app.use('/api/products', productRoute)
app.use('/api/categories', categoryRoute)


//* Middlewares
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(port, () => {
    connection()
    console.log(`Server is running on port ${port}`)
})