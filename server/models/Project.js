const { Schema, model } = require('mongoose');
const format_date = require('../utils/format_date');

const  commentSchema  = require('./commentSchema');
const  donationSchema  = require('./donationSchema');


const mongooseLeanGetters = require('mongoose-lean-getters');

const projectSchema = new Schema(
    {
        projectName: {
            type: String,
            required: true,
            unique: true,
            minLength: 3,
            maxLength: 30,
        },
        projectDescription: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 500
        },
       projectImage: {
            type: String,
            required: false 
        },
        projectDate: {
            type: Date,
            default: Date.now,
            get: function() {
                return format_date(this.projectDate);
            }
        },
        expiresIn: {
            type: Number, // Number of days after the projectDate before the fundraiser is over.
            required: false
        },
        goalAmount: {
            type: Number,
            required: true,
            //Decimal: 2 places
        },
        userId: {
            type: Schema.Types.ObjectId, //The ID of the user who creates the project
        },
        comments: [commentSchema], 
        donations: [donationSchema]

    }
);

projectSchema.plugin(mongooseLeanGetters);
const Project = model('Project', projectSchema);

module.exports =  Project;
