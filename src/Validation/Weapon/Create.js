import { body } from 'express-validator'

// Middleware
import CheckValidationError from '../../Middlewares/CheckValidationError'

const Create = () => {
	const validator = [
		body('name').trim().not().isEmpty().bail().isString().bail().escape(),
		body('variant')
			.trim()
			.not()
			.isEmpty()
			.bail()
			.isString()
			.bail()
			.escape(),
		body('type').trim().not().isEmpty().bail().isString().bail().escape(),
		body('exotic')
			.trim()
			.not()
			.isEmpty()
			.bail()
			.isBoolean()
			.bail()
			.escape(),
		CheckValidationError(),
	]

	return validator
}

export default Create
