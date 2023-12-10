const { Schema } = require('mongoose');
const format_date = require('../utils/format_date');
const mongooseLeanGetters = require('mongoose-lean-getters');

const donationSchema = Schema(
    {   
        donorId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        amount: {
            type: Number,
            required: true,
            //Expressed using two decimal positions
        },
        donationDate: {
            type: Date,
            default: Date.now,
            get: (timestamp) =>  format_date(timestamp)
        },
        projectId: {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
}, {
    toJSON: {
        getters: true,
    },
    id: false,
}
)

donationSchema.plugin(mongooseLeanGetters);

module.exports = donationSchema;
