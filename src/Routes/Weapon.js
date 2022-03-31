import express from 'express'

// Controllers
import {
	Create,
	Update,
	DeleteById,
	GetById,
	GetAll,
} from '../Controllers/Weapon'

// Middleware
import VerifyJWT from '../Middlewares/VerifyJWT'

// Validation
import CreateValidation from '../Validation/Weapon/Create'
import DeleteValidation from '../Validation/Weapon/Delete'
import GetValidation from '../Validation/Weapon/Get'
import UpdateValidation from '../Validation/Weapon/Update'

const Router = express.Router()

Router.get('/weapons', GetAll)
Router.get('/weapon/:id', ...GetValidation(), GetById)
Router.post('/weapons', VerifyJWT, ...CreateValidation(), Create)
Router.put('/weapon/:id', VerifyJWT, ...UpdateValidation(), Update)
Router.delete('/weapon/:id', VerifyJWT, ...DeleteValidation(), DeleteById)

export default Router
