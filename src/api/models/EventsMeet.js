const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        title:{
            type: String,
			required: true,
        },
        date: {
            type: Date,
            default: () => Date.now(),
          },
        user_event:{
            type: Schema.Types.ObjectId,
            reference: "Users"
        },
        description:{
            type: String,
			required: true,
        },
        people_asist:{
            type: [{
                type: Schema.Types.ObjectId,
                reference: "Users"
            },]
        }


},
{
		timestamps: true,
	}
)

module.exports = model("EventsMeet", schema);