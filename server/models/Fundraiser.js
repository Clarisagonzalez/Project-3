const { Schema, model } = require('mongoose');

const { commentSchema } = require('./commentSchema');
const { donationSchema } = require('./donationsSchema');

//Importing plug-ins in order to be able to compute virtual properties and use getters when retrieving 'lean' documents
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanGetters = require('mongoose-lean-getters');

// Schema to create User model
const donorSchema = new Schema(
    {
        donorname: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            //Add some validation: length, alpha-numeric?
        },
        email: {
            type: String,
            unique: true,
            required: true,
            //Regular expression to validate a user-entered email address
            match: /^([\w\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        },
        password: {
            type: String,
            required: true,
            //Add some validation: length, special symbol, number, upper and lowercase
        },

        donations: [donationSchema],

        comments: [commentSchema]

        projects: []
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
//Defining a getter for the 'friendCount' virtual property.
donorSchema
    .virtual('donationCount')
    .get(function () {
        return this.donations.length;
    });

donorSchema
    .virtual('donationTotal')
    .get(function () {
        return //Total amount donated amongst all individual donations
    });

//Attaching the plug-ins to the schema.
userSchema.plugin(mongooseLeanVirtuals);
userSchema.plugin(mongooseLeanGetters);

module.exports = model('donor', donorSchema);