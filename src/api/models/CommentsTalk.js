const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        id_event_talk:{
            type: Schema.Types.ObjectId,
            reference: "EventsTalks"
        },
        comment:{
            type: String,
			required: true,
        },
        response: {
            type: [Schema.Types.ObjectId],
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

module.exports = model("CommentsTalk", schema);