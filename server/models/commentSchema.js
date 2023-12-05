const { Schema } = require('mongoose');
const mongooseLeanGetters = require('mongoose-lean-getters');

const commentSchema = Schema(
    {   
        commentAuthor: {
            type: Schema.Types.ObjectId,
            ref: 'donor'
        },
        commentText: {
            type: String,
            required: true,
            trim: true,
            //Add length validation?
            //upvotes? downvotes? => virtuals?
            //reply? By the author of the fundraiser
        },
        commentDate: {
            type: Date,
            default: Date.now(),
            get: (timestamp) =>  format_date(timestamp)
        }

}, {
    toJSON: {
        getters: true,
    },
    id: false,
}
)

commentSchema.plugin(mongooseLeanGetters);

module.exports = commentSchema;
