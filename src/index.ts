require('dotenv-flow').config()
import express from 'express'
import members from './routes/members'
import { connectToMongoDB } from './config/mongo'
import routerLogger from './tools/logger'
import cors from 'cors'

export const app = express()
app.use(cors())

app.use(express.json())

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(routerLogger)

app.use('/webhook/members', members)

const PORT = process.env.PORT || 3002

app.listen(PORT, async () => {
  await connectToMongoDB()
  console.log('Connected To Mongo')
  console.log(`Listening to webhooks on port http://localhost:${PORT}`)
})
