import 'module-alias/register'
import dotenv from 'dotenv'
import express, { json } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'

import articleRoutes from './routes/article.routes'

dotenv.config()

const app = express()
const PORT = 3000

mongoose.connect(process.env['MONGO_URI'] as string)
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log(error))

app.use(cors())
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true }))
app.use(json())

app.use('/api/articles', articleRoutes)

app.use('/uploads', express.static(__dirname + '/uploads'))

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))