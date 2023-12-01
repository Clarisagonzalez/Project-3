const { Schema } = require('mongoose');
const format_date = require('../utils/format_date');
const mongooseLeanGetters = require('mongoose-lean-getters');

const donationSchema = Schema(
    {   
        donor: {
            type: Schema.Types.ObjectId,
            ref: 'donor'
        },
        amount: {
            type: Number,
            required: true,
            //Expressed using two decimal positions
        },
        donationDate: {
            type: Date,
            default: new Date.now(),
            get: (timestamp) =>  format_date(timestamp)
        },
        //donationType? Maybe in the Project model

}, {
    toJSON: {
        getters: true,
    },
    id: false,
}
)

donationSchema.plugin(mongooseLeanGetters);

module.exports = donationSchema;
