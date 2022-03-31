import 'dotenv/config'

import express from 'express'

// Middleware
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'

// Database
import db from './Database'

// Router
import AuthenticationRouter from './Routes/Authentication'
import WeaponRouter from './Routes/Weapon'
import NoMatchRouter from './Routes/NoMatch'

const app = express()
const PORT = process.env.PORT || 8080

// Middleware
app.use(compression())
app.use(helmet())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

// Database
db.on('error', error => {
	console.log(`MongoDB connection error: ${error}`)
})

// Router
app.use('/api', AuthenticationRouter)
app.use('/api', WeaponRouter)

app.use('*', NoMatchRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
