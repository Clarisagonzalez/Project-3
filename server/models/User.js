const { Schema, model } = require('mongoose');

const  commentSchema  = require('./commentSchema');
const  donationSchema  = require('./donationSchema');

//Importing plug-ins in order to be able to compute virtual properties and use getters when retrieving 'lean' documents
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanGetters = require('mongoose-lean-getters');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            minLen: 5,
            //match: /^[A-Z0-9-_]{3, }$/i //The username must contain at least 3 characters, they can be letters(lower or uppercase), numbers, dashes or underscores
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
            minLength: 8,
            //match: /[0-9]+(\W)+(\S)+/ //The password must contain at one number and at least one non-word character; it must not contain whitespaces( at least one more non-whitespace character is required)
        },

        donations: [donationSchema],

        comments: [commentSchema],

        projects: [{
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }] 
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
//Defining a getter for the 'donationCount' virtual property.
userSchema
    .virtual('donationCount')
    .get(function() {
        return this.donations.length;
    });

userSchema
    .virtual('donationTotal')
    .get(function() {

        return this.donations.reduce((total, current) => total + current,0);//Total amount donated amongst all individual donations
    });

userSchema
    .virtual('numberOfProjects')
    .get(function() {
        return this.projects.length;
    })
//Attaching the plug-ins to the schema.
userSchema.plugin(mongooseLeanVirtuals);
userSchema.plugin(mongooseLeanGetters);

const User = model('User', userSchema);

module.exports =  User ;