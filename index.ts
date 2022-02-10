import 'module-alias/register'
import dotenv from 'dotenv'
import express, { json } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRoutes from '~/routes/user.routes'
import articleRoutes from '~/routes/article.routes'

import { MiddlewareErrors } from '~/middleware/middleware.errors'

dotenv.config()

const app = express()
const PORT = 3000

mongoose.connect(process.env['MONGO_URI'] as string)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error))

app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(json())
app.use('/api/user', userRoutes)
app.use('/api/articles', articleRoutes)
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(MiddlewareErrors)

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
