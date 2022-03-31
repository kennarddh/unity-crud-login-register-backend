import mongoose, { Schema } from 'mongoose'

const Weapon = new Schema(
	{
		name: { type: String, required: true },
		variant: { type: String, required: true },
		type: { type: String, required: true },
		exotic: { type: Boolean, required: true },
	},
	{ timestamps: true }
)

export default mongoose.model('weapons', Weapon)
