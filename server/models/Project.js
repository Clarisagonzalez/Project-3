const { Schema, model } = require('mongoose');
const format_date = require('../utils/format_date');

const  commentSchema  = require('./commentSchema');
const  donationSchema  = require('./donationSchema');


const mongooseLeanGetters = require('mongoose-lean-getters');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

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

    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false,
    }
);

projectSchema.virtual('amountCollected').get(function(){
    return this.donations.reduce((total, current) => total + current, 0);
});
projectSchema.virtual('amountToReachGoal').get(function() {
    let amountCollected = this.donations.reduce((total, current) => total + current, 0);
    if(this.goalAmount >= amountCollected){
        return this.goalAmount - amountCollected;
    } else {
        return 0;
    }
})


projectSchema.virtual('numberOfDonations').get(function() {
    return this.donations.length}
    );

projectSchema.virtual('numberOfComments').get(function() {
    return this.comments.length}
    );

projectSchema.plugin(mongooseLeanGetters);
projectSchema.plugin(mongooseLeanVirtuals);
const Project = model('Project', projectSchema);

module.exports =  Project;
