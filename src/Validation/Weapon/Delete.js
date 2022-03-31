import { param } from 'express-validator'

// Middleware
import CheckValidationError from '../../Middlewares/CheckValidationError'

const Get = () => {
	const validator = [
		param('id').trim().not().isEmpty().bail().isString().bail().escape(),
		CheckValidationError(),
	]

	return validator
}

export default Get
