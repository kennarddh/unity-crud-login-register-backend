// Models
import Weapon from '../Models/Weapon'

export const Create = async (req, res) => {
	const { body } = req

	const weapon = new Weapon({
		name: body.name,
		variant: body.variant,
		type: body.type,
		exotic: body.exotic,
	})

	await weapon
		.save()
		.then(() => {
			return res.status(201).json({
				success: true,
				data: {
					id: weapon._id,
				},
			})
		})
		.catch(() => {
			return res.status(500).json({
				success: false,
				error: 'Weapon not created',
			})
		})
}

export const Update = async (req, res) => {
	const { body, params } = req

	const weaponExists = await Weapon.exists({
		_id: params.id,
	})
		.exec()
		.then(exists => exists)
		.catch(() => false)

	if (!weaponExists)
		return res.status(404).json({
			success: false,
			error: 'Weapon not found',
		})

	Weapon.updateOne(
		{ _id: params.id },
		{
			name: body.name,
			variant: body.variant,
			type: body.type,
			exotic: body.exotic,
		}
	)
		.then(() => {
			return res.status(200).json({
				success: true,
				data: {
					id: params.id,
				},
			})
		})
		.catch(err => {
			console.log(err)
			return res.status(500).json({
				success: false,
				error: 'Weapon not updated',
			})
		})
}

export const DeleteById = async (req, res) => {
	const { params } = req

	const weaponExists = await Weapon.exists({
		_id: params.id,
	})
		.exec()
		.then(exists => exists)
		.catch(() => false)

	if (!weaponExists)
		return res.status(404).json({
			success: false,
			error: 'Weapon not found',
		})

	await Weapon.findOneAndDelete({ _id: params.id })
		.exec()
		.then(weapon => {
			return res.status(200).json({
				success: true,
				data: {
					id: weapon._id,
					name: weapon.name,
					variant: weapon.variant,
					type: weapon.type,
					exotic: weapon.exotic,
				},
			})
		})
		.catch(() => {
			return res.status(500).json({
				success: false,
				error: 'Weapon not deleted',
			})
		})
}

export const GetById = async (req, res) => {
	await Weapon.findById(req.params.id)
		.exec()
		.then(weapon => {
			return res.status(200).json({
				success: true,
				data: {
					id: weapon._id,
					name: weapon.name,
					variant: weapon.variant,
					type: weapon.type,
					exotic: weapon.exotic,
				},
			})
		})
		.catch(() => {
			return res.status(404).json({
				success: false,
				error: 'Weapon Not Found',
			})
		})
}

export const GetAll = async (req, res) => {
	await Weapon.find({})
		.exec()
		.then(weapons => {
			return res.status(200).json({
				success: true,
				data: weapons.map(weapon => ({
					id: weapon._id,
					name: weapon.name,
					variant: weapon.variant,
					type: weapon.type,
					exotic: weapon.exotic,
				})),
			})
		})
		.catch(() => {
			return res.status(404).json({
				success: false,
				error: 'Weapons Not Found',
			})
		})
}
