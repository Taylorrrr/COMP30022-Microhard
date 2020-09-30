const mongoose = require('mongoose');

const {Schema} = mongoose;

const projectSchema = new Schema(
	{
		user : {
			type: mongoose.Schema.Types.ObjectId,
      		ref: 'User'
		},
		name : String,
		contributors: Array,
		skills : Array,
		description: String,
		status: {
			type: String,
			enum: ['Inprogress','Completed','Cancel'],
			default: 'Inprogress'
		},
		show_status:{
			type: String,
			enum: ['private','public'],
			default: 'public'
		},
		process: Array,
		timeline: Array,
		rating: Number
	}
	,{timestamps: true}
	
);

const project = mongoose.model('Projects',projectSchema);
module.exports = project;