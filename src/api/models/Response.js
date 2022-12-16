const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        comment:{
            type: Schema.Types.ObjectId,
            reference: "Comment"
        },
        response:{
            type: String,
			required: true,
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

module.exports = model("Response", schema);