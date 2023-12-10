const { Schema } = require('mongoose');
const mongooseLeanGetters = require('mongoose-lean-getters');
const format_date = require('../utils/format_date');

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
            minLength: 1,
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
