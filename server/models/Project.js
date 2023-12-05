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
            maxLength: 12,
        },
        projectDescription: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 280
        },
       /* projectImage: {
            type: Blob,
            required: false //?
        },*/
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

//If goal is reached or surpassed, show thank you message to the donors (maybe send email?)

projectSchema.virtual('numberOfDonations').get(function() {
    return this.donations.length}
    );

projectSchema.virtual('numberOfComments').get(function() {
    return this.comments.length}
    );
/*
projectSchema.virtuals('countdownToExpiration').get(() => {
    return; //expirationDate - inceptionDate
})*/

projectSchema.plugin(mongooseLeanGetters);
projectSchema.plugin(mongooseLeanVirtuals);
const Project = model('Project', projectSchema);

module.exports =  Project;
