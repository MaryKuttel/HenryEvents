const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        id_event_meet:{
            type: Schema.Types.ObjectId,
            reference: "EventsMeet"
        },
        comment:{
            type: String,
			required: true,
        },
        response: {
            type: [Types.ObjectId],
            ref: 'Response'
        },
        user_comment:{
            type: Schema.Types.ObjectId,
            reference: "Users"
        },
        date: {
            type: Date,
            required: [true, "date is required"],
            default: () => Date.now(),
          },


},
{
		timestamps: false,
	}
)

module.exports = model("CommentsMeet", schema);