const { Schema } = require('mongoose');
const mongooseLeanGetters = require('mongoose-lean-getters');

const commentSchema = Schema(
    {   
        commentAuthor: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        commentText: {
            type: String,
            required: true,
            trim: true,
            minLength: 10,
            maxLenght: 280,
           
        },
        commentDate: {
            type: Date,
            default:  Date.now,
            get: (timestamp) =>  format_date(timestamp)
        },
        upvotes: {
            type: Number,
            default: 0
        },
        projectId: {
            type: Schema.Types.ObjectId // The project being commented on by the user
        },
        reply: [
            {
                replyText: {
                    type: String,
                    minLength: 10,
                    maxLength: 280
                }
            },
               { fundraiserId: Schema.Types.ObjectId }//The _id of the person who is fundraising for the cause.
        
        ]

}, {
    toJSON: {
        getters: true,
    },
    id: false,
}
)

commentSchema.plugin(mongooseLeanGetters);

module.exports = commentSchema;
