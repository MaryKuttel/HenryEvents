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
        people_assist:{
            type: [{
                type: Schema.Types.ObjectId,
                reference: "Users"
            },]
        },
        link:{
            type: String
        },
        comments:{
            type: [{
                type: Schema.Types.ObjectId,
                reference: "CommentsTalk"
            },]
        }, 
        type:{
            type: String,
            default: "talk"
        }


},
{
		timestamps: false,
	}
)

module.exports = model("EventsTalk", schema);