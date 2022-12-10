const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        first_name:{
            type: String,
			required: true,
        },
        last_name:{
            type: String,
			required: true,
        },
        email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		fav_events_meet:{
			type: [{
                type: Schema.Types.ObjectId,
                reference: "EventsMeet"
            },]
		},
		fav_events_talk:{
			type: [{
                type: Schema.Types.ObjectId,
                reference: "EventsTalks"
            },]
		}


},
{
		timestamps: true,
	}
)

module.exports = model("Users", schema);