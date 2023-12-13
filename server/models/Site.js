const { Schema, model } = require('mongoose');
const format_date = require('../utils/format_date');
//Importing plug-ins in order to be able to compute virtual properties and use getters when retrieving 'lean' documents
const mongooseLeanGetters = require('mongoose-lean-getters');

// Schema to create User model
const siteSchema = new Schema(
    {
        donorName: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            minLen: 5,
        },
        donorID: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        donationAmount: {
            type: Number,
            max: 100.00 //We are agrassroots organization that only receives small donations
        },
        donorComment: {
            type: String,
            maxLen: 500
        },
        paymentMethod: {
            type: String,
        },
        donationDate: {
            type: Date,
            default: Date.now,
            get: function (){
                return format_date(this.donationDate)
            }
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }

);

siteSchema.plugin(mongooseLeanGetters);

const Site = model('Site', siteSchema);

module.exports = Site;